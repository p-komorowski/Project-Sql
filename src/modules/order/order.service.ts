import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Connection } from "typeorm";
import { BasketService } from "../basket/basket.service";
import { Order } from "./entity/order.entity";
import { OrderRepository } from "./repository/order.repository";
import { Customer } from "../../modules/user/entities/user.entity";
import { RequestContextProvider } from "../../middleware/request-context.middleware";
import { UserRepository } from "../user/repository/user.repository";

@Injectable()
export class OrderService {
  private orderRepository: OrderRepository;
  private userRepository: UserRepository
  constructor(private readonly connection: Connection, private basketService: BasketService) {
    this.orderRepository = this.connection.getCustomRepository(OrderRepository);
    this.userRepository = this.connection.getCustomRepository(UserRepository);

  }

  async findUsersOrder(user: Customer): Promise<Order> {
    const usr =  await this.userRepository.findOne({
        where: {
          id: user.id
        },
        relations: ["order"]
      }
    );
    return usr.order;
  }

  async createOrder(): Promise<Order> {
    const currentUser = RequestContextProvider.currentUser();
    const order = await this.findUsersOrder(currentUser);
    if (order) {
      throw new UnauthorizedException("order already placed");
    }
    const basket = await this.basketService.getBasketForUser(currentUser);
    if (!basket) {
      throw new UnauthorizedException("user basket doesnt exists");
    }
    const newOrder = await this.orderRepository.create({
      basket: basket,
      user: currentUser,
    });

    return await this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]>{
   return await this.orderRepository.find()
  }
}
