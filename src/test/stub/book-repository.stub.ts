import {
  basketBooksModelMock,
  basketModelMock,
  newUserModelMock,
} from '../mock';
import { Repository } from 'typeorm';
import { MockType } from '.';

// @ts-ignore
export const bookRepositoryStubFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(basketModelMock),
    find: jest.fn().mockReturnValue([basketModelMock]),
    findById: jest.fn().mockReturnValue(newUserModelMock),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(basketBooksModelMock),
    })),
    remove: jest.fn().mockReturnValue({}),
    save: jest.fn().mockReturnValue(basketBooksModelMock),
  }));
