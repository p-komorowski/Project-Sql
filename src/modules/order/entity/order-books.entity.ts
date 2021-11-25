import { Book } from '../../book/entities/book.entity';
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from './order.entity';

@Entity()
export class BasketBooks {
  @PrimaryColumn()
  id: string = uuid();

  @Column({ name: 'basket_id' })
  basketId: string = uuid();

  @Column()
  IBSN: string;

  @Column()
  quantity: number;

  @OneToMany(() => Book, (book) => book.IBSN)
  book: Book[];

  @OneToMany(() => Order, (order) => order.id)
  order: Order[];
}
