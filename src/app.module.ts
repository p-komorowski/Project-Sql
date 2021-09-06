import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {config} from "./config";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database), // import samego configu zamiast pisania calej konfiguracji
  ],
})
export class AppModule {}
