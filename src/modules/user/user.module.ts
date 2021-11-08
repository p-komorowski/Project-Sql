import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UsersService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    providers: [UsersService, UserRepository],
    exports: [UsersService],
})
export class UserModule {}
