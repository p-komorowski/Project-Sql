import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { config } from "./config";
import { RequestContextProvider } from "./middleware/request-context.middleware";
import { RequestContextMiddleware } from "./middleware/request-contextProvider.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthRepository } from "./modules/auth/repository/auth.repository";
import { BasketModule } from "./modules/basket/basket.module";
import { BooksController } from "./modules/books/books.controller";
import { BooksModule } from "./modules/books/books.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    AuthModule,
    UserModule,
    BooksModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AuthRepository, RequestContextProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes(BooksController);
  }
}
