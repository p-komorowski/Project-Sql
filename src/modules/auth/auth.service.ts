import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Connection } from "typeorm";
import { Customer } from "../user/entities";
import { UsersService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Token } from "./entity/token.entity";
import { AuthRepository } from "./repository/auth.repository";

@Injectable()
export class AuthService {
  private authRepository: AuthRepository;
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly connection: Connection
  ) {
    this.authRepository = this.connection.getCustomRepository(AuthRepository);
  }

  async validateUser(user: Customer, pass: string): Promise<any> {
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new NotFoundException("Incorrect password or email");
    }
  }

  async register(userData: RegisterDto): Promise<Customer> {
    const userReg = await this.userService.findByEmail(userData.email);
    if (userReg) {
      throw new BadRequestException("email already in database");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword;
      const newUser = this.userService.create(userData);
      return newUser // upewnic sie ze nie zwracał hasła
    }
  }

  async login(user: LoginDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password };
    const userEntity = await this.userService.findByEmail(user.email);
    const valUser = await this.validateUser(userEntity, user.password);
    const token = await this.jwtService.sign(payload);
    const newToken = await this.addNewToken(userEntity, token);
    if (!valUser) {
      throw new NotFoundException("cannot validate");
    }
    else 
      return token;
  }

  async addNewToken(user: Customer, jwt: string): Promise<any> {
    const newTime = new Date();
    const time = new Date(newTime.getTime() + 60000 * 10);
    const addedToken = new Token({
      token: jwt,
      expTime: time,
      lastLogin: newTime,
      user: user,
    });
    this.authRepository.create(addedToken);
    
    return this.authRepository.save(addedToken);
  }
}
