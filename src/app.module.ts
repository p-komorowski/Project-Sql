import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import {config} from "./config";
import { AuthModule } from "./modules/auth/auth.module";
import { BooksModule } from "./modules/books/books.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    UserModule,
    BooksModule, // import samego configu zamiast pisania calej konfiguracji
  ],
  controllers: [AppController],
})
export class AppModule {}
