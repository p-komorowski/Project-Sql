import { Book } from '../../book/entity/book.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Basket } from './basket.entity';
@Entity()
export class BasketBook {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  count: number;

  @ManyToOne(() => Book, (book) => book.basketBook)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => Basket, (basket) => basket.basketBooks)
  basket: Basket;
}
