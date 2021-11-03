import { Controller, Post, Body, Res, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { Response } from "express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller()
export class AuthController {
  logger: Logger;
  constructor(private authService: AuthService) {
    this.logger = new Logger(AuthController.name);
  }

  @Post("auth/register")
  @ApiOperation({ summary: 'Register User' })
  @ApiResponse({ status: 201, description: 'User registration.' })
  @ApiUnauthorizedResponse({ description: 'User already exists.'})
  @ApiBody({type: RegisterDto})
  async register(@Body() reqisterDto: RegisterDto) {
    this.logger.warn("logger test warn");
    return this.authService.register(reqisterDto);
  }

  @Post("auth/login")
  @ApiOperation({ summary: 'Log user' })
  @ApiResponse({ status: 200, description: 'User Login.' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials.'})
  @ApiBody({type: LoginDto})
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const token = await this.authService.login(loginDto);
    const newTime = new Date();
    const time = new Date(newTime.getTime() + 60000 * 10 * 10 + 18000000000);
    response
      .cookie("access_token", token, {
        httpOnly: true,
        domain: "localhost",
        expires: time,
      })
      .send({ success: true });
  }
}
