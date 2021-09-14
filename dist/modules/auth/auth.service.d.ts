import { JwtService } from "@nestjs/jwt";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthRepository } from "./repository/auth.repository";
export declare class AuthService {
    private jwtService;
    private readonly repository;
    constructor(jwtService: JwtService, repository: AuthRepository);
    validateUser(email: string, pass: string): Promise<any>;
    register(userData: RegisterDto): Promise<any>;
    login(user: LoginDto): Promise<any>;
}
