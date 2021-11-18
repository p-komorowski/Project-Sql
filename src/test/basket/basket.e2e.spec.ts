import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { BasketService } from '../../modules/basket/basket.service';
import { BooksService } from '../../modules/book/book.service';
import { UsersService } from '../../modules/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Basket, BasketBook } from '../../modules/basket/entities';
import { basketBookRepositoryStubFactory, MockType, bookRepositoryStubFactory, userRepositoryStubFactory, basketRepositoryStubFactory } from '../stub';
import { Book } from '../../modules/book/entity/book.entity';
import { BasketController } from '../../modules/basket/basket.controller';
import { JwtService } from '@nestjs/jwt';
import { Strategy } from 'passport-jwt-mock';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { RolesGuard } from '../../modules/auth/guards/roles.guard';
import { Customer } from '../../modules/user/entities';
import { basketBooksModelMock, newUserModelMock } from '../mock';
import { RequestContextProvider } from '../../middleware/request-context.middleware';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { BasketBooksRepository } from 'src/modules/basket/repository/basket-books.repository';

class JwtStrategyMock extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '',
    });
  }
  async validate(payload: any) {
    return { userEmail: payload.sub, username: payload.username };
  }
}

describe('Basket', () => {
  let app: INestApplication;
  let basketBookRepository: MockType<BasketBooksRepository>;

  beforeAll(async () => {
    RequestContextProvider.currentUser = jest
      .fn()
      .mockReturnValue(newUserModelMock);

    const mock_ForceFailGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BasketController],
      providers: [
        BasketService,
        BooksService,
        UsersService,
        {
          provide: JwtService,
          useClass: JwtStrategyMock,
        },
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
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mock_ForceFailGuard)
      .overrideGuard(RolesGuard)
      .useValue(mock_ForceFailGuard)
      .compile();

    app = module.createNestApplication();
    basketBookRepository = module.get(getRepositoryToken(BasketBook));
    await app.init();
  });

  it(`/POST`, async () => {
    basketBookRepository.createQueryBuilder.mockImplementation(
      jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(null),
      })),
    );

    await request(app.getHttpServer())
      .post('/basket/add')
      .send({ IBSN: 1 })
      .set('Accept', 'application/json')
      .expect(201)
      .expect('{"id":"1","count":1}');
  });

  it(`/PATCH`, async () => {
    basketBookRepository.createQueryBuilder.mockImplementation(
      jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(basketBooksModelMock),
      })),
    );

    await request(app.getHttpServer())
      .patch('/basket/1')
      .send({ count: 2 })
      .expect('{"id":"1","count":2}');
  });
});
