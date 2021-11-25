import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import { Order } from './entity';
import { OrderRepository } from './repository/order.repository';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { Customer } from '../user/entities';
import { UserRepository } from '../user/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { OrderResponseDto } from './dto/order-response.dto';

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
      throw new BadRequestException('order already placed');
    }
    const basket = await this.basketService.getBasketForUser(currentUser);
    if (!basket) {
      throw new NotFoundException('user basket doesnt exists');
    }
    const newOrder = await this.orderRepository.create({
      basket: basket,
      user: currentUser,
    });

    return this.orderRepository.save(newOrder);
  }

  async getAllOrders(): Promise<OrderResponseDto[]> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .addSelect(['user.name', 'user.email'])
      .leftJoinAndSelect('order.basket', 'basket')
      .leftJoinAndSelect('basket.basketBooks', 'basketBooks')
      .leftJoinAndSelect('basketBooks.book', 'book')
      .getMany();

    return plainToClass(OrderResponseDto, result);
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
