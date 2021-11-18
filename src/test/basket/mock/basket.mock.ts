import { Token } from '../../../modules/auth/entity/token.entity';
import { Basket, BasketBook } from '../../../modules/basket/entities';
import { Book } from '../../../modules/book/entity/book.entity';
import { Customer } from '../../../modules/user/entities';

export const basketModelMock: Basket = {
  id: '1',
} as Basket;

export const basketBooksModelMock: BasketBook = {
  id: '1',
  count: 1,
} as BasketBook;

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

export const newUserModelMock: Customer = {
  email: 'user@email.com',
  password: 'password!',
  name: 'user',
  role: 'user',
  id: '1',
  token: [new Token({ token: 'sdsd' })],
  basket: basketModelMock,
  order: null,
};
export const newModeratorModelMoc = {
  email: 'user1@email.com',
  password: 'password!',
  username: 'moderator',
  role: 'moderator',
};
