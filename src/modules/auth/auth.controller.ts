import { Controller, Post, Body, UseGuards, Res, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Controller()
export class AuthController {
  logger:Logger;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {this.logger = new Logger(AuthController.name);}

  @Post("auth/register")
  async register(@Body() reqisterDto: RegisterDto) {
    this.logger.warn('logger test warn')
    return this.authService.register(reqisterDto);
  }

  @Post("auth/login")
  async login(@Body() @Res() loginDto: LoginDto, response: Response) {
    const token = await this.authService.login(loginDto);
    response
      .cookie("access_token", token, {
        httpOnly: true,
        domain: "localhost",
        expires: new Date(Date.now() + 60000 * 10),
      })
      .send({ success: true });
      
  }

  @Post("login")
  login1(@Res() response: Response) {
    const userId = "userId";
    const payload = { userId: userId };
    const token = this.jwtService.sign(payload);
    response
      .cookie("access_token", token, {
        httpOnly: true,
        domain: "localhost",
        expires: new Date(Date.now() + 60000 * 10),
      })
      .send({ success: true });
  }

  @Post("hello")
  @UseGuards(AuthGuard("jwt"))
  devices(): string {
    this.logger.log('logger test')
    return "test cookie";
  }
}
