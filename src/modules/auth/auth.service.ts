import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '../user/entities';
import { UsersService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto';
import { Token } from './entity/token.entity';
import { AuthRepository } from './repository/auth.repository';
import {AES} from 'crypto-js';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Token)
    private readonly authRepository: AuthRepository,
  ) {}

  async validateUser(user: Customer, pass: string): Promise<any> {
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotFoundException('Incorrect password or email');
    }
  }

  async register(userData: RegisterDto): Promise<Customer> {
    const userReg = await this.userService.findByEmail(userData.email);
    if (userReg) {
      throw new BadRequestException('email already in database');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const newUser = await this.userService.create(userData);
    newUser.password = undefined;
    return {
      ...newUser,
      password: undefined,
    };
  }

  async login(user: LoginDto): Promise<string> {
    const payload = { sub: user.email, pass: user.password };
    const userEntity = await this.userService.findByEmail(user.email);
    const valUser = await this.validateUser(userEntity, user.password);
    const secret = process.env.ENCRYPTION_KEY
    // 1. JWS with secret signing
    const jwsToken = await this.jwtService.sign(payload);
    await this.jwtService.verify(jwsToken)
    // 2. JWS with encrypting payload
    const jwsTokenPayloadEncrypted = await this.jwtService.sign({data: AES.encrypt(JSON.stringify(payload),secret).toString()});
    await this.jwtService.verify(jwsTokenPayloadEncrypted)
    //3. JWE
     const jwsEncryptedToken =  AES.encrypt(jwsToken, secret).toString()
     await this.jwtService.verify(jwsEncryptedToken)
    const token = jwsToken
    //result U2FsdGVkX18xocobfrLTP1q%2FXCX2dk7dvsROrhpViiHd7gIN2DbPNDFD7c1hyOFcRky2tE4N%2B10hCxRAd%2FNmlOCOXZvsQo8jfxuULyaANSPV1pNd5N%2BJOLUVUCBKtcS9ohHUiOdcQeKyQAqskqKab0MWEJFN3fI6b%2F2bEflTwhbPHO67PIH04QqhLv4hAtxtO99Z%2FGMlEGWwMXKEdkv7hsuvjcSzjfepITS1BQDGRmDHmJm1M%2FygQDr%2Fxt0IK8jppoDJCKaBmbNAX3XYFF1X0%2ByEFKNV6a91XzPrzVIzPPo%3D
   
    await this.addNewToken(userEntity, token);
    if (!valUser) {
      throw new BadRequestException('cannot validate');
    }
    return token;
  }

  


  async addNewToken(user: Customer, jwt: string): Promise<any> {
    const newTime = new Date();
    const date = +process.env.DATE_SERVICE;
    const time = new Date(newTime.getTime() + date);
    const addedToken = new Token({
      token: jwt,
      expTime: time,
      lastLogin: newTime,
      user: user,
    });

    return this.authRepository.save(addedToken);
  }
}
