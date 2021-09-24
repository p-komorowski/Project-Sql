import { Controller, Post, Body, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post("auth/register")
  async register(@Body() reqisterDto: RegisterDto) {
    return this.authService.register(reqisterDto);
  }

  @Post("auth/login")
  async login(@Body() @Res() loginDto: LoginDto, response: Response) {
    const token = await this.authService.login(loginDto);
    console.log(token);
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
    return "test cookie";
  }
}
