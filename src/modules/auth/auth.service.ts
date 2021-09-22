import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Connection } from "typeorm";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthRepository } from "./repository/auth.repository";

@Injectable()
export class AuthService {
  private authRepository: AuthRepository;
  constructor(
    private jwtService: JwtService,
      private readonly connection: Connection
  ) {
      this.authRepository = this.connection.getCustomRepository(AuthRepository);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.authRepository.findOne(email)
    console.log(user)
    console.log(email, pass)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const {password, ...result} = user;
      return result;
    }
    else {
      throw new NotFoundException('validateUser')
    }
  }

  async register(userData: RegisterDto): Promise<any> {
    const userReg = await this.authRepository.findOne(userData.email)
    console.log(userReg)
    if (!userReg){
    const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      userData.password = hashedPassword
    return this.authRepository.save(userData)
  }
    else {
      throw new NotFoundException ('email already in database')
    }
  }

  async login(user: LoginDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password };
    const valUser = await this.validateUser(user.email, user.password); 
     if (valUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }  else {
      throw new NotFoundException('cannot validate');
    }
  } 
}
