import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { BasketBooks } from "./entities/basket_books.entity";
import { BasketRepository } from "./repository/basket.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BasketBooks])],
  providers: [BasketService, BasketRepository],
  controllers: [BasketController],
})
export class BasketModule {}
