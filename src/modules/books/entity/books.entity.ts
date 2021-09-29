import { Basket } from "src/modules/basket/entities/basket.entity";
import { BasketBooks } from "src/modules/basket/entities/basket_books.entity";
import { OrderBooks } from "src/modules/order/dto/order_books.dto";
import { Review } from "src/modules/review/dto/review.dto";
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

  @OneToMany(() => Review, (review) => review.id)
  review: Review[];
}
