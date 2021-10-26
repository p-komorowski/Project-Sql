import { Basket } from "../../basket/entities/basket.entity";
import { OrderBooks } from "../../order/dto/order_books.dto";
import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn, DeepPartial, JoinTable, OneToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Review } from "../../review/dto/review.dto";
import { BookInterface } from "../interface/book.interface";
import { BasketBooks } from "../../basket/entities/basket_book.entity";

@Entity()
export class Books {
  constructor(book: DeepPartial<BookInterface> ){
    Object.assign(this, book);
  }
  @ApiProperty({description: 'IBSN of book' })
  @PrimaryColumn()
  IBSN: string;

  @ApiProperty({description: 'Title of book' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({description: 'price of book' })
  @Column({ nullable: true })
  price: number;

  @ApiProperty({description: 'Name of author' })
  @Column({ nullable: true })
  author: string;

  @ApiProperty({description: 'count of book' })
  @Column({ nullable: true })
  count: number;

  @OneToOne(() => BasketBooks, basketBooks => basketBooks.books,
  {cascade:true})
  @JoinColumn()
  basketBooks:BasketBooks;
  
  @ManyToOne(() => OrderBooks, (orderBooks) => orderBooks.id)
  orderBooks: OrderBooks[];
}
