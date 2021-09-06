import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BooksService} from "./books.service";
import {entities} from "../../config";
import {BooksRepository} from "./books.repository";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [BooksService, BooksRepository],
})
export class BooksModule {}
