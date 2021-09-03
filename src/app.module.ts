import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "./modules/auth/auth_entity/token.entity";
import { shoppingBasket } from "./modules/basket/basket_entity/shopping_basket.entity";
import { Books } from "./modules/books/books_entity/books.entity";
import { contactDetails } from "./modules/user/user_entity/contact-details.entity";
import { User } from "./modules/user/user_entity/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Haslo!234",
      database: "project2",
      entities: [User, contactDetails, Books, Token, shoppingBasket],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
