import { Basket } from "../..//basket/entities/basket.entity";
import { OrderBooks } from "../..//order/dto/order_books.dto";
import { Review } from "../..//review/dto/review.dto";
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class Books {
  @PrimaryColumn()
  IBSN: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  count: number;

  @ManyToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @ManyToOne(() => OrderBooks, (orderBooks) => orderBooks.id)
  orderBooks: OrderBooks[];


}
