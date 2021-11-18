import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from '../user/entities';
import { UsersService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto';
import { Token } from './entity/token.entity';
import { AuthRepository } from './repository/auth.repository';

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
    const token = await this.jwtService.sign(payload);
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
