import { Repository } from 'typeorm';
import { basketBooksModelMock, basketModelMock, newUserModelMock } from './basket.mock';


export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn().mockReturnValue(basketModelMock),
    find: jest.fn().mockReturnValue([basketModelMock]),
    finddById: jest.fn().mockReturnValue(newUserModelMock),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(basketBooksModelMock),
    })),
    remove: jest.fn().mockReturnValue({}),
    save: jest.fn().mockReturnValue(basketBooksModelMock),
  }),
);

// @ts-ignore
export const userRepositoryMockFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(newUserModelMock),
  }));

// @ts-ignore
export const basketBookRepositoryMockFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(basketModelMock),
    find: jest.fn().mockReturnValue([basketModelMock]),
    finddById: jest.fn().mockReturnValue(newUserModelMock),
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
