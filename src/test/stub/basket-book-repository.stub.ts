import {
  basketBooksModelMock,
  basketModelMock,
  newUserModelMock,
} from '../mock';
import { Repository } from 'typeorm';
import { MockType } from '.';


// @ts-ignore
export const basketBookRepositoryStubFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(basketModelMock),
    find: jest.fn().mockReturnValue([basketModelMock]),
    findById: jest.fn().mockReturnValue(newUserModelMock),
    remove: jest.fn().mockReturnValue({}),
    save: jest.fn().mockReturnValue(basketBooksModelMock),
    update: jest.fn().mockReturnValue(basketBooksModelMock),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(basketBooksModelMock),
    })),
  }));
