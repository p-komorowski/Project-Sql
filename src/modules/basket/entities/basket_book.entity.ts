import { Books } from "../../book/entity/book.entity";
import { Entity, Column, PrimaryColumn, DeepPartial, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Basket } from "./basket.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BasketBooksInterface } from "../interface/basket_books.interface";

@Entity()
export class BasketBooks {
  constructor(basket: DeepPartial<BasketBooksInterface> ){
    Object.assign(this, basket);
  }
  
  @PrimaryColumn()
  IBSN:string
  @Column()
  @ApiProperty({type: Number, description: 'Quantity'})
  quantity: number;

  @ManyToOne(()=>Books, (books)=> books.IBSN)
  books: Books[]

  @ManyToOne(() =>Basket, (basket) => basket.basketId)
  basket: Basket[]
}
