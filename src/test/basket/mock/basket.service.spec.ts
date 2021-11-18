import { Test, TestingModule } from '@nestjs/testing';
import { basketBookRepositoryMockFactory, MockType, repositoryMockFactory, userRepositoryMockFactory } from './basket-repostiory.stub';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BasketService } from '../../../modules/basket/basket.service';
import { BasketRepository } from '../../../modules/basket/repository/basket.repository';
import { BasketBooksRepository } from '../../../modules/basket/repository/basket-books.repository';
import { Basket, BasketBook } from '../../../modules/basket/entities';
import { BooksService } from '../../../modules/book/book.service';
import { UsersService } from '../../../modules/user/user.service';
import { Customer } from '../../../modules/user/entities';
import { Book } from '../../../modules/book/entity/book.entity';
import { basketBooksModelMock, basketModelMock, newUserModelMock, newBookModelMock } from './basket.mock';
import { RequestContextProvider } from '../../../middleware/request-context.middleware';
import { BookDto } from '../../../modules/book/dto';

describe('BasketService', () => {
  let service: BasketService;
  let repository: MockType<BasketRepository>;
  let basketBookRepository: MockType<BasketBooksRepository>;

  beforeEach(async () => {
    jest.mock('../../../middleware/request-context.middleware');
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
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(BasketBook),
          useFactory: basketBookRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Customer),
          useFactory: userRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Book),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    await module.init();

    service = module.get<BasketService>(BasketService);
    repository = module.get(getRepositoryToken(Basket));
    basketBookRepository = module.get(getRepositoryToken(BasketBook));
  });

  it('should be defined ', () => {
    expect(service).toBeDefined();
  });

  it('should get basket', async () => {
    const foo = await service.getBasket();
    expect(foo).toEqual([basketModelMock]);
  });

  it('should delete book from basket', async () => {
    const foo = await service.deleteBookFromBasket('1');
    expect(foo).toEqual(undefined);
  });

  it('should get basket for current user', async () => {
    const foo = await service.getBasketForUser(newUserModelMock);
    expect(foo).toEqual(basketModelMock);
  });

  it('should get basketBook for basket', async () => {
    const foo = await service.getBasketBookForBasket('1', '1');
    expect(foo).toEqual(basketBooksModelMock);
  });

  it('should insert Book in Basket', async () => {
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

  it('update count of book in user basket', async () => {
    const foo = await service.updateCountOfBookInBasket('1', {
      id: '1',
      count: 3,
      IBSN: '1',
    });
    expect(foo).toEqual({ id: '1', count: 3 });
  });
});
