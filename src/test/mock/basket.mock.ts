import { Basket, BasketBook } from '../../modules/basket/entities';

export const basketModelMock: Basket = {
  id: '1',
} as Basket;

export const basketBooksModelMock: BasketBook = {
  id: '1',
  count: 1,
} as BasketBook;

export const newBasketBooksModelMock: BasketBook = {
  id: '2',
  count: 1,
} as BasketBook;
