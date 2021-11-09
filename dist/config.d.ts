import { ContactDetails, User } from './modules/user/entities';
import { Books } from './modules/books/entity/books.entity';
import { Token } from './modules/auth/entity/token.entity';
import { shoppingBasket } from './modules/basket/entity/basket.entity';
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
export declare const config: ConfigInterface;
export declare const entities: (
  | typeof ContactDetails
  | typeof User
  | typeof Token
  | typeof Books
  | typeof shoppingBasket
)[];
export {};
