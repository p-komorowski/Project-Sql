import { Injectable } from "@nestjs/common";
import { Connection } from "typeorm";
import { User } from "./entities";
import { RegisterDto } from "../auth/dto/register.dto";
import { userRepository } from "./repository/user.repository";
import { RequestContextProvider } from "src/middleware/request-context.middleware";
import { OrderBooks } from "../order/dto/order_books.dto";
import { LoginDto } from "../auth/dto/login.dto";

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

  async findById(id: LoginDto): Promise<User> {
    return this.repository.findOne(id);
  }


  // async findOrder(orderId:string []){

  //    const order = this.orderService.getAll(orderId)
  //   const user = RequestContextProvider.currentUser();

  //   // user.order=OrderBooks;
  //   // await this.repository.update(user.id,user)
  //   await this.repository.save({
  //     ...user,
  //     order:order
  //   })
  // }

  async create(newUser: RegisterDto): Promise<User> {
    const userEntity = new User(newUser);
    return this.repository.save(userEntity);
  }
}
