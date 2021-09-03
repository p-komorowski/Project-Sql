import "reflect-metadata";
import { createConnection } from "typeorm";
import { Token } from "./modules/auth/auth_entity/token.entity";
import { shoppingBasket } from "./modules/basket/basket_entity/shopping_basket.entity";
import { Books } from "./modules/books/books_entity/books.entity";
import { contactDetails } from "./modules/user/user_entity/contact-details.entity";
import { User } from "./modules/user/user_entity/user.entity";

createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "project2",
  entities: [User, contactDetails, Books, shoppingBasket, Token],
  synchronize: true,
  logging: false,
})
  .then((connection) => {
    
  })
  .catch((error) => console.log(error));
