import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./repository/auth.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthStrategy } from "./strategy/auth.strategy";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { UsersService } from "../user/user.service";
import { RolesGuard } from "./strategy/roles.guard";

@Module({
  imports: [
    TypeOrmModule,
    AuthModule,
    UserModule,
    PassportModule,
    RequestContextProvider,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "600s" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthRepository,
    AuthStrategy,
    RequestContextProvider,
    RolesGuard
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
