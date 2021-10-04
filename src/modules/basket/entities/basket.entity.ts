import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { Books } from "../../books/entity/books.entity";

@Entity()
export class Basket {
  @PrimaryColumn({ name: "basket_id"})
  basketId: string = uuid();

  @Column({ name: "user_id" })
  userId: string = uuid();

  @ManyToOne(() => User, (user) => user)
  user: User[];

  @ManyToMany(() => Books, (books) => books.IBSN)
  books: Books[];
}
