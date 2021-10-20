import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, DeepPartial } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { Books } from "../../book/entity/book.entity";
import { BasketInterface } from "../interface/basket.interface";

@Entity()
export class Basket {
  constructor(basket: DeepPartial<BasketInterface> ){
    Object.assign(this, basket);
  }
  @PrimaryColumn({ name: "basket_id" })
  basketId: string = uuid();

  @Column({ name: "user_id" })
  userId: string = uuid();

  @ManyToOne(() => User, (user) => user)
  user: User[];

  @ManyToMany(() => Books, (books) => books.IBSN)
  @JoinTable()
  books:Books[];
  
}
