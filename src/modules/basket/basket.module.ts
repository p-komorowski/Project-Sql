import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Books } from "../books/entity/books.entity";
import { BasketService } from "./basket.service";

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BasketService],
})
export class BasketModule {}
