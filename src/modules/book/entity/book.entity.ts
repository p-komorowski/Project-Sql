import { OrderBooks } from '../../order/dto/order-books.dto';
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany, JoinColumn, DeepPartial } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BookInterface } from '../interface/book.interface';
import { BasketBook } from '../../basket/entities/basket-book.entity';
import { Review } from '../../review/entity/review.entity';

@Entity()
export class Book {
  constructor(book: DeepPartial<BookInterface>) {
    Object.assign(this, book);
  }
  @ApiProperty({ description: 'IBSN of book' })
  @PrimaryColumn()
  IBSN: string;

  @ApiProperty({ description: 'Title of book' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ description: 'price of book' })
  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @ApiProperty({ description: 'Name of author' })
  @Column({ nullable: true })
  author: string;

  @ApiProperty({ description: 'count of book' })
  @Column({ nullable: true })
  count: number;

  @OneToMany(() => BasketBook, (basketBook) => basketBook.book)
  basketBook: BasketBook;

  @ManyToOne(() => OrderBooks, (orderBooks) => orderBooks.id)
  orderBooks: OrderBooks[];

  @OneToMany(() => Review, (review) => review.book)
  @JoinColumn()
  review: Review[];
}
