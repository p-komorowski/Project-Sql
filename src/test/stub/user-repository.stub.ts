import { newUserModelMock } from '../mock';
import { Repository } from 'typeorm';
import { MockType } from '.';

// @ts-ignore
export const userRepositoryStubFactory: () => MockType<Repository<any>> =
  jest.fn(() => ({
    findOne: jest.fn().mockReturnValue(newUserModelMock),
  }));
