'use strict';
exports.__esModule = true;
exports.entities = exports.config = void 0;
var entities_1 = require('./modules/user/entities');
var book_entity_1 = require('./modules/book/entities/book.entity');
var token_entity_1 = require('./modules/auth/entity/token.entity');
var basket_book_entity_1 = require('./modules/basket/entities/basket-book.entity');
var order_books_dto_1 = require('./modules/order/dto/order-books.dto');
var order_entity_1 = require('./modules/order/entity/order.entity');
var entities_2 = require('./modules/basket/entities');
var review_entity_1 = require('./modules/review/entity/review.entity');
exports.config = {
  jwtKey: process.env.JWT_SECRET,
  name: 'new',
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  },
};
exports.entities = [
  entities_1.Customer,
  book_entity_1.Book,
  token_entity_1.Token,
  basket_book_entity_1.BasketBook,
  order_books_dto_1.OrderBooks,
  order_entity_1.Order,
  entities_2.Basket,
  review_entity_1.Review,
];
