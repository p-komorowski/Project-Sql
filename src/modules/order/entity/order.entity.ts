import { Customer } from '../../user/entities';
import { Entity, PrimaryColumn, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Basket } from '../../basket/entities/basket.entity';

@Entity()
export class Order {
  @PrimaryColumn()
  id: string = uuid();

  @OneToOne(() => Basket, (basket) => basket.order)
  @JoinColumn()
  basket: Basket;

  @OneToOne(() => Customer, (user) => user.order)
  user: Customer;
}
