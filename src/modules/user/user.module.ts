import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { userRepository } from "./repository/user.repository";
import { UsersService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, userRepository],
  exports: [UsersService],
})
export class UserModule {}
