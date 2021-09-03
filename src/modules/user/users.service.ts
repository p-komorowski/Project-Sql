import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user_entity/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
  async create(newUser: RegisterDto): Promise<User> {
    const userReg = await this.repository.findOne(newUser.email);
    if (!userReg) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      const addedUser = await this.repository.save({
        ...newUser,
        password: hashedPassword,
      });
      return addedUser
    } else {
      throw new NotFoundException('email already in database');
    }
  }
}