import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { config } from "./config";
import { RequestContextProvider } from "./middleware/request-context.middleware";
import { RequestContextMiddleware } from "./middleware/request-context-provider.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthRepository } from "./modules/auth/repository/auth.repository";
import { BasketModule } from "./modules/basket/basket.module";
import { BooksController } from "./modules/book/book.controller";
import { BooksModule } from "./modules/book/book.module";
import { UserModule } from "./modules/user/user.module";
import { BasketController } from "./modules/basket/basket.controller";
import { OrderModule } from "./modules/order/order.module";
import { OrderController } from "./modules/order/order.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./modules/auth/strategy/roles.guard";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    AuthModule,
    UserModule,
    BooksModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthRepository,
    RequestContextProvider,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .exclude({path: 'books', method:RequestMethod.GET},
      {path:'books/review', method: RequestMethod.POST}
      )
      .forRoutes(BooksController, BasketController, OrderController);
  }
}
