import {
  Entity,
  Column,
  DeepPartial,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid } from 'uuid';
import { Book } from './book.entity';
import { PriceHistoryInterface } from '../interface/price-history.interface';

@Entity()
export class PriceHistory {
  constructor(price: DeepPartial<PriceHistoryInterface>) {
    Object.assign(this, price);
  }

  @ApiProperty({ description: 'id of history' })
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ApiProperty({ description: 'previous price of book' })
  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  previousPrice: number;

  @ApiProperty({ description: 'current price of book' })
  @Column({ nullable: true, type: 'decimal', precision: 5, scale: 2 })
  currentPrice: number;

  @ApiProperty({ description: 'date of changes' })
  @CreateDateColumn({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Book, (Book) => Book.priceHistory)
  book: Book;
}
