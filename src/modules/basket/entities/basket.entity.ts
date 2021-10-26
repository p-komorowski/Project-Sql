import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, DeepPartial, OneToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { Books } from "../../book/entity/book.entity";
import { BasketInterface } from "../interface/basket.interface";
import { BasketBooks } from "./basket_book.entity";

@Entity()
export class Basket {
  // constructor(basket: DeepPartial<BasketInterface> ){
  //   Object.assign(this, basket);
  // }


  @PrimaryColumn({ name: "basket_id" })
  id: string = uuid();

  @OneToOne(() => User, (user) => user.basket)
  user: User;

  @OneToMany(() => BasketBooks, (basketBooks) => basketBooks.basket)
  @JoinTable()
  basketBooks:BasketBooks[];
}
