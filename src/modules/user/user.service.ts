import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Customer } from './entities';
import { RegisterDto } from '../auth/dto/register.dto';
import { UserRepository } from './repository/user.repository';
import { LoginDto } from '../auth/dto/login.dto';
import { Order } from '../order/entity';

@Injectable()
export class UsersService {
    private repository: UserRepository;
    constructor(private readonly connection: Connection) {
        this.repository = this.connection.getCustomRepository(UserRepository);
    }

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

    async findUsersOrder(user: Customer): Promise<Order> {
        const usr = await this.repository.findOne({
            where: {
                id: user.id,
            },
            relations: ['order'],
        });
        return usr.order;
    }
}
