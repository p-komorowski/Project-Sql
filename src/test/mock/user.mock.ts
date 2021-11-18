import { basketModelMock } from './basket.mock';
import { Token } from '../../modules/auth/entity/token.entity';
import { Customer } from '../../modules/user/entities';

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

export const newUserWithoutBasketModelMock: Customer = {
  email: 'user@email.com',
  password: 'password!',
  name: 'user',
  role: 'user',
  id: '1',
  token: [new Token({ token: 'sdsd' })],
  basket: null,
  order: null,
};
