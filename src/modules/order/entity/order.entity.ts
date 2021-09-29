import { Books } from "src/modules/books/entity/books.entity";
import { User } from "src/modules/user/entities";
import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { OrderBooks } from "../dto/order_books.dto";

@Entity()
export class Order {
  @PrimaryColumn()
  id: string = uuid();

  @Column({ name: "basket_id" })
  basketId: string = uuid();

  @Column()
  IBSN: string;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderBooks, (orderBooks) => orderBooks.id)
  orderBooks: OrderBooks[];

  @ManyToOne(() => User, (user) => user.id)
  user: User[];
}
