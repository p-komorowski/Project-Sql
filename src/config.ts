import { ContactDetails, User } from "./modules/user/entities";
import { Books } from "./modules/books/entity/books.entity";
import { Token } from "./modules/auth/entity/token.entity";
import { BasketBooks } from "./modules/basket/entities/basket_books.entity";
import { OrderBooks } from "./modules/order/dto/order_books.dto";
import { Order } from "./modules/order/entity/order.entity";
import { Basket } from "./modules/basket/entities/basket.entity";


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
}

export const config: ConfigInterface = {
  jwtKey: process.env.JWT_SECRET,
  database: {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: false,
  },
};

/*
 * config: miejsce w ktorym odczytujesz zmienne srodowsikowe z .env i stale property uzywane w projekcie
 * autoLoadEntity pozwala na automatyczny odczyt encji w danym module */
export const entities = [User, Books, Token, ContactDetails, BasketBooks,OrderBooks,Order,Basket];
