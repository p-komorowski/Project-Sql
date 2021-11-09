import { ContactDetails, Customer } from './modules/user/entities';
import { Book } from './modules/book/entity/book.entity';
import { Token } from './modules/auth/entity/token.entity';
import { BasketBook } from './modules/basket/entities/basket-book.entity';
import { OrderBooks } from './modules/order/dto/order-books.dto';
import { Order } from './modules/order/entity/order.entity';
import { Basket } from './modules/basket/entities/basket.entity';
import { Review } from './modules/review/entity/review.entity';
interface ConfigDBInterface {
  type: any;
  host: string;
  port: number;
  password: string;
  database: string;
  username: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
}

interface ConfigInterface {
  jwtKey: string;
  database: ConfigDBInterface;
  name: string;
}

export const config: ConfigInterface = {
  jwtKey: process.env.JWT_SECRET,
  name: 'new',
  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: true,
  },
};

export const entities = [
  Customer,
  Book,
  Token,
  ContactDetails,
  BasketBook,
  OrderBooks,
  Order,
  Basket,
  Review,
];
