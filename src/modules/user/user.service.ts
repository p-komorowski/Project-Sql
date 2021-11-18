import { Injectable } from '@nestjs/common';
import { Customer } from './entities';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserRepository } from './repository/user.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Customer)
  private readonly repository: UserRepository) {}

  findAll(): Promise<Customer[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findById(id: LoginDto): Promise<Customer> {
    return this.repository.findOne(id);
  }

  async create(newUser: RegisterDto): Promise<Customer> {
    const userEntity = new Customer(newUser);
    return this.repository.save(userEntity);
  }
}
