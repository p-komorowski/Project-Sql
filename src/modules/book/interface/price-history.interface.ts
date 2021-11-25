import { Book } from '../entities/book.entity';

export interface PriceHistoryInterface {
  IBSN: string;
  currentPrice: number;
  price: number;
  book: Book;
}
