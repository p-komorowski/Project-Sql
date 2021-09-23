import { Controller, Post, Body, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

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
        domain: "localhost:3000",
        expires: new Date(Date.now() + 60000 * 10),
      })
      .send({ success: true });
  }

  @Post("hello")
  @UseGuards(AuthGuard("jwt"))
  devices(): string {
    return "Hello ";
  }
}
