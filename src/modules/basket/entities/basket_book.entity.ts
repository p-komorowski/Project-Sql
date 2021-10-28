import { Books } from "../../book/entity/book.entity";
import { Entity, Column, PrimaryColumn, DeepPartial, ManyToOne, PrimaryGeneratedColumn, ManyToMany, OneToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Basket } from "./basket.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BasketBooksInterface } from "../interface/basket_books.interface";

@Entity()
export class BasketBooks {
  // constructor(basket: DeepPartial<BasketBooksInterface> ){
  //   Object.assign(this, basket);
  // }
  
  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();
  
 

  @OneToOne(() => Books, books => books.basketBooks)
  books: Books

  @ManyToOne(() =>Basket, (basket) => basket.basketBooks,
  )
  basket: Basket
}
