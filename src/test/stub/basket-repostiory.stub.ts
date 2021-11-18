import { Repository } from 'typeorm';
import { newUserModelMock } from '../mock';
import { basketBooksModelMock, basketModelMock } from '../mock/basket.mock';
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const basketRepositoryStubFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(basketModelMock),
    find: jest.fn().mockReturnValue([basketModelMock]),
    findById: jest.fn().mockReturnValue(newUserModelMock),
    remove: jest.fn(),
    save: jest.fn().mockReturnValue(basketBooksModelMock),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(basketBooksModelMock),
    })),
  }));
