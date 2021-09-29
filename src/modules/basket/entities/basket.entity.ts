import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, ManyToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { BasketBooks } from "./basket_books.entity";
import { Books } from "src/modules/books/entity/books.entity";

@Entity()
export class Basket {
  @PrimaryColumn({ name: "basket_id", type: uuid})
  basketId: string = uuid();

  @Column({ name: "user_id" })
  userId: string = uuid();

  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @ManyToMany(() => Books, (books) => books.IBSN)
  books: Books[];
}
