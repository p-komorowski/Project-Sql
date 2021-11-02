import { Entity, PrimaryColumn, ManyToOne, JoinTable, OneToOne, OneToMany } from "typeorm";
import { Customer } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { BasketBook } from "./basket_book.entity";
import { Order } from "../../order/entity/order.entity";

@Entity()
export class Basket {
  @PrimaryColumn()
  id: string = uuid();

  @OneToOne(() => Customer, (customer) => customer.basket)
  customer: Customer;

  @OneToMany(() => BasketBook, (basketBooks) => basketBooks.basket)
  @JoinTable()
  basketBooks:BasketBook[];

  @OneToOne(() => Order, (order) => order.basket)
  order: Order;

}
