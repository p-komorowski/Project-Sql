import { Book } from '../../modules/book/entities/book.entity';

export const BookModelMock: Book = {
  IBSN: '1',
  title: 'title',
  author: 'author',
  price: 1.99,
  count: 1,
} as Book;

export const newBookModelMock: Book = {
  IBSN: '2',
  title: 'title',
  author: 'author',
  price: 1.99,
  count: 1,
} as Book;
