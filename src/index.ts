import "reflect-metadata";
import {createConnection} from "typeorm";
import {Token} from "./modules/auth/entity/token.entity";
import {shoppingBasket} from "./modules/basket/entity/shopping_basket.entity";
import {Books} from "./modules/books/entity/books.entity";
import {ContactDetails, User} from "./modules/user/entities";

createConnection({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Haslo!234",
  database: "Project2",
  entities: [User, ContactDetails, Books, shoppingBasket, Token],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    
  })
  .catch((error) => console.log(error));
