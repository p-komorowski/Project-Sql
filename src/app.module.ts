import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { config } from "./config";
import { RequestContextMiddleware, RequestContextProvider } from "./middleware/request-context";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthRepository } from "./modules/auth/repository/auth.repository";
import { BasketModule } from "./modules/basket/basket.module";
import { BooksModule } from "./modules/books/books.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    AuthModule,
    UserModule,
    BooksModule,
    BasketModule, // import samego configu zamiast pisania calej konfiguracji
  ],
  controllers: [AppController],
  providers: [AuthRepository, RequestContextProvider],
})
export class AppModule  implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(RequestContextMiddleware)
        .forRoutes('*');
}
}
