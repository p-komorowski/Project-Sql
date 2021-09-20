import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { shoppingBasket } from "./entity/basket.entity";
import { BasketRepository } from "./repository/basket.repository";

@Module({
  imports: [TypeOrmModule.forFeature([shoppingBasket])],
  providers: [BasketService,BasketRepository],
  controllers:[BasketController]
})
export class BasketModule {}
