import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import { Order } from './entity/order.entity';
import { OrderRepository } from './repository/order.repository';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { Customer } from '../user/entities';
import { UserRepository } from '../user/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(Customer)
    private readonly userRepository: UserRepository,
    private basketService: BasketService,
  ) {}

  async createOrder(): Promise<Order> {
    const currentUser = RequestContextProvider.currentUser();
    const order = await this.findUsersOrder(currentUser);
    if (order) {
      throw new UnauthorizedException('order already placed');
    }
    const basket = await this.basketService.getBasketForUser(currentUser);
    if (!basket) {
      throw new UnauthorizedException('user basket doesnt exists');
    }
    const newOrder = await this.orderRepository.create({
      basket: basket,
      user: currentUser,
    });

    return this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .addSelect(['user.name', 'user.email'])
      .leftJoinAndSelect('order.basket', 'basket')
      .leftJoinAndSelect('basket.basketBooks', 'basketBooks')
      .leftJoinAndSelect('basketBooks.book', 'book')
      .getMany();
  }

  async findUsersOrder(user: Customer): Promise<Order> {
    const usr = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
      relations: ['order'],
    });
    return usr.order;
  }
}
