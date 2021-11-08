import { JwtService } from '@nestjs/jwt';
import { Connection } from 'typeorm';
import { User } from '../user/entities';
import { UsersService } from '../user/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly connection;
    private authRepository;
    constructor(
        userService: UsersService,
        jwtService: JwtService,
        connection: Connection,
    );
    validateUser(user: User, pass: string): Promise<any>;
    register(userData: RegisterDto): Promise<any>;
    login(user: LoginDto): Promise<any>;
    addNewToken(user: User, jwt: string): Promise<any>;
}
