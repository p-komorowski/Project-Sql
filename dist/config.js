'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.entities = exports.config = void 0;
const entities_1 = require('./modules/user/entities');
const books_entity_1 = require('./modules/books/entity/books.entity');
const token_entity_1 = require('./modules/auth/entity/token.entity');
const basket_entity_1 = require('./modules/basket/entity/basket.entity');
exports.config = {
  jwtKey: process.env.JWT_SECRET,
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
  },
};
exports.entities = [
  entities_1.User,
  books_entity_1.Books,
  token_entity_1.Token,
  entities_1.ContactDetails,
  basket_entity_1.shoppingBasket,
];
//# sourceMappingURL=config.js.map
