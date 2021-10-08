import { Controller, Post, Body, Res, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";

@Controller()
export class AuthController {
  logger: Logger;
  constructor(private authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post("auth/register")
  async register(@Body() reqisterDto: RegisterDto) {
    this.logger.warn("logger test warn");
    return this.authService.register(reqisterDto);
  }

  @Post("auth/login")
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const token = await this.authService.login(loginDto);
    const newTime = new Date();
    const time = new Date(newTime.getTime() + 60000 * 10 * 10 + 1800000);
    response
      .cookie("access_token", token, {
        httpOnly: true,
        domain: "localhost",
        expires: time,
      })
      .send({ success: true });
  }
}
