import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, SchemaOptions } from "mongoose";
import { shoppingBasket } from "./basket_entity/shopping_basket.entity";

@Injectable()
export class BasketRepository {
  constructor(
    @InjectModel("ShoppingBasket") private readonly model: Model<shoppingBasket>
  ) {}

  async save(doc: shoppingBasket): Promise<shoppingBasket> {
    const product = new this.model(doc);
    return product.save();
  }

  async findAll(): Promise<shoppingBasket[]> {
    return this.model.find().exec();
  }

  async delete(basket_id: string): Promise<any> {
    return this.model.deleteOne({ _basket_id: basket_id }).exec();
  }
}
