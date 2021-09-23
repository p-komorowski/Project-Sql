import { Controller, Post, Body, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from 'express';
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("auth/register")
  async register(@Body() reqisterDto: RegisterDto) {
    return this.authService.register(reqisterDto);
  }

  @Post("auth/login")
  async login(@Body() loginDto: LoginDto,response: Response) {
   const cookie = this.authService.login(loginDto)
   response
      .cookie('access_token', cookie, {
        httpOnly: true,
        domain: 'localhost:3000', 
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send({ success: true })
      
  }

  @Post('hello')
  @UseGuards(AuthGuard('jwt'))
  devices(): string {
    return 'Hello ';
  }

}
