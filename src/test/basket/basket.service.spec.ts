import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BasketService } from '../../modules/basket/basket.service';
import { BasketRepository } from '../../modules/basket/repository/basket.repository';
import { BasketBooksRepository } from '../../modules/basket/repository/basket-books.repository';
import { Basket, BasketBook } from '../../modules/basket/entities';
import { BooksService } from '../../modules/book/book.service';
import { UsersService } from '../../modules/user/user.service';
import { Customer } from '../../modules/user/entities';
import { Book } from '../../modules/book/entity/book.entity';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { BookDto } from '../../modules/book/dto';
import { basketBooksModelMock, basketModelMock, BookModelMock, newBookModelMock, newUserModelMock, newUserWithoutBasketModelMock } from '../mock';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { basketBookRepositoryStubFactory, basketRepositoryStubFactory, bookRepositoryStubFactory, MockType, userRepositoryStubFactory } from '../stub/basket-repostiory.stub';
import { UserRepository } from 'src/modules/user/repository/user.repository';

describe('BasketService', () => {
  let service: BasketService;
  let basketRepository: MockType<BasketRepository>;
  let basketBookRepository: MockType<BasketBooksRepository>;
  let userRepository: MockType<UserRepository>;

  beforeEach(async () => {
    RequestContextProvider.currentUser = jest
      .fn()
      .mockReturnValue(newUserModelMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        BooksService,
        UsersService,
        {
          provide: getRepositoryToken(Basket),
          useFactory: basketRepositoryStubFactory,
        },
        {
          provide: getRepositoryToken(BasketBook),
          useFactory: basketBookRepositoryStubFactory,
        },
        {
          provide: getRepositoryToken(Customer),
          useFactory: userRepositoryStubFactory,
        },
        {
          provide: getRepositoryToken(Book),
          useFactory: bookRepositoryStubFactory,
        },
      ],
    }).compile();

    service = module.get<BasketService>(BasketService);
    basketRepository = module.get(getRepositoryToken(Basket));
    basketBookRepository = module.get(getRepositoryToken(BasketBook));
    userRepository = module.get(getRepositoryToken(Customer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get basket', async () => {
    const results = await service.getBasket();
    expect(results).toEqual([basketModelMock]);
  });

  describe('delete', () => {
    it('should delete book from basket', async () => {
      await service.deleteBookFromBasket('1');
      const spy = jest.spyOn(basketBookRepository, 'remove');
      expect(spy).toBeCalledTimes(1);
    });

    it('should throw UnauthorizedException when ....', async () => {
      service.getBasketForUser = jest.fn().mockReturnValueOnce(null);
      const promise = service.deleteBookFromBasket('1');
      await expect(promise).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when ....', async () => {
      service.getBasketBookForBasket = jest.fn().mockReturnValueOnce(null);
      const promise = service.deleteBookFromBasket('1');
      await expect(promise).rejects.toThrow(UnauthorizedException);
    });
  });

  it('should get basket for current user', async () => {
    const foo = await service.getBasketForUser(newUserModelMock);
    expect(foo).toEqual(basketModelMock);
  });

  it('should get basketBook for basket', async () => {
    const foo = await service.getBasketBookForBasket('1', '1');
    expect(foo).toEqual(basketBooksModelMock);
  });
  describe('insert', () => {
    it('should insert Book into Basket', async () => {
      basketBookRepository.createQueryBuilder.mockImplementation(
        jest.fn(() => ({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockReturnValue(null),
        })),
      );
      const foo = await service.insertBookInBasket(newBookModelMock as BookDto);

      expect(foo).toEqual(basketBooksModelMock);
    });

    it('should throw BadRequestException if book is already in basket', async () => {
      service.getBasketBookForBasket = jest
        .fn()
        .mockReturnValueOnce(basketBooksModelMock);
      const promise = service.insertBookInBasket(newBookModelMock);

      await expect(promise).rejects.toThrow(BadRequestException);
    });

    it('should call basketRepository one when basket does not exist', async () => {
      userRepository.findOne.mockImplementation(
        jest.fn().mockReturnValue(newUserWithoutBasketModelMock),
      );
      basketBookRepository.createQueryBuilder.mockImplementation(
        jest.fn(() => ({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockReturnValue(null),
        })),
      );

      await service.insertBookInBasket(newBookModelMock);
      const spy = jest.spyOn(basketRepository, 'save');
      expect(spy).toBeCalledTimes(1);
    });

    it('should throw BadRequest when book is already in basket', async () => {
      basketBookRepository.createQueryBuilder.mockImplementation(
        jest.fn(() => ({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockReturnValue(basketBooksModelMock),
        })),
      );

      const promise = service.insertBookInBasket(BookModelMock);
      await expect(promise).rejects.toThrow(BadRequestException);
    });
  });

  describe('find', () => {
    it('should find books in user basket', async () => {
      const foo = await service.getBooksInUserBasket();
      expect(foo).toEqual([basketModelMock]);
    });

    it('should find user', async () => {
      const foo = await service.getUser(newUserModelMock);
      expect(foo).toEqual(newUserModelMock);
    });

    it('should find user by id', async () => {
      const foo = await service.getUserById(1);
      expect(foo).toEqual(newUserModelMock);
    });
  });

  describe('count', () => {
    it('update count of book in user basket', async () => {
      const foo = await service.updateCountOfBookInBasket('1', {
        id: '1',
        count: 3,
        IBSN: '1',
      });
      expect(foo).toEqual({ id: '1', count: 3 });
    });

    it('should throw BadRequest when user did not have basket', async () => {
      userRepository.findOne.mockImplementation(
        jest.fn().mockReturnValue(newUserWithoutBasketModelMock),
      );
      const promise = service.updateCountOfBookInBasket('1', {
        id: '1',
        count: 1,
        IBSN: '1',
      });
      await expect(promise).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequest when there is no book in user basket', async () => {
      basketBookRepository.createQueryBuilder.mockImplementation(
        jest.fn(() => ({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          getOne: jest.fn().mockReturnValue(null),
        })),
      );
      const promise = service.updateCountOfBookInBasket('1', {
        id: '1',
        count: 1,
        IBSN: '1',
      });
      await expect(promise).rejects.toThrow(BadRequestException);
    });
  });
});
