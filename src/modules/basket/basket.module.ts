import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Books } from "../books/entity/books.entity";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BasketService],
  controllers:[BasketController]
})
export class BasketModule {}
