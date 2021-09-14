import { Repository } from 'typeorm';
import { User } from './entities';
import { RegisterDto } from '../auth/dto/register.dto';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    findAll(): Promise<User[]>;
    create(newUser: RegisterDto): Promise<User>;
}
