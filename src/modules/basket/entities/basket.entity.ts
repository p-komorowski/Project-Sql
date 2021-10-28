import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinTable, DeepPartial, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { Books } from "../../book/entity/book.entity";
import { BasketInterface } from "../interface/basket.interface";
import { BasketBooks } from "./basket_book.entity";
import { join } from "path";

@Entity()
export class Basket {
  push() {
    throw new Error("Method not implemented.");
  }
  // constructor(basket: DeepPartial<BasketInterface> ){
  //   Object.assign(this, basket);
  // }


  @PrimaryColumn()
  id: string = uuid();

  @OneToOne(() => User, (user) => user.basket)
  user: User;

  @OneToMany(() => BasketBooks, (basketBooks) => basketBooks.basket)
  @JoinTable()
  basketBooks:BasketBooks[];
}
