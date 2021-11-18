import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from './strategy/auth.strategy';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { UsersService } from '../user/user.service';
import { RolesGuard } from './guards/roles.guard';
import { UserRepository } from '../user/repository/user.repository';
import { entities } from '../../config';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    }),
    AuthRepository,
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    AuthRepository,
    AuthStrategy,
    RequestContextProvider,
    RolesGuard,
    UserRepository,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
