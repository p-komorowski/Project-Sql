import { Injectable } from '@nestjs/common';
import { Customer } from './entities';
import { RegisterDto, LoginDto } from '../auth/dto';
import { UserRepository } from './repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: UserRepository,
  ) {}

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
