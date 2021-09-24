import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { User } from "./entities";
import { RegisterDto } from "../auth/dto/register.dto";
import { userRepository } from "./repository/user.repository";

@Injectable()
export class UsersService {
  private repository: userRepository;
  constructor(private readonly connection: Connection) {
    this.repository = this.connection.getCustomRepository(userRepository);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(newUser: RegisterDto): Promise<User> {
    const userEntity = new User(newUser);
    return this.repository.save(userEntity);
  }
}
