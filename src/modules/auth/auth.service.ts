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
    const user = await this.authRepository.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
  }

  async register(userData: RegisterDto): Promise<any> {
    return this.authRepository.create(userData);
  }
  async login(user: LoginDto): Promise<any> {
    const payload = { sub: user.email, pass: user.password };
    const valUser = await this.validateUser(user.email, user.password);
    if (valUser) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new NotFoundException("cannot validate");
    }
  }
}
