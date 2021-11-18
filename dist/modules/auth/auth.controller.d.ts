import { Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
  private authService;
  private jwtService;
  logger: Logger;
  constructor(authService: AuthService, jwtService: JwtService);
  register(reqisterDto: RegisterDto): Promise<any>;
  login(loginDto: LoginDto, response: Response): Promise<void>;
  login1(response: Response): void;
  devices(): string;
}
