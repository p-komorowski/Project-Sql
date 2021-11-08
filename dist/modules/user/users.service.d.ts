import { Connection } from 'typeorm';
import { User } from './entities';
import { RegisterDto } from '../auth/dto/register.dto';
export declare class UsersService {
    private readonly connection;
    private repository;
    constructor(connection: Connection);
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
    create(newUser: RegisterDto): Promise<User>;
}
