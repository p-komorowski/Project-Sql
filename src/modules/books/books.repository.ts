import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Books } from "./books_entity/books.entity";

@Injectable()
export class BooksRepository {
  constructor(@InjectModel("Books") private readonly model: Model<Books>) {}

  async save(doc: Books): Promise<Books> {
    const product = new this.model(doc);
    return product.save();
  }

  async findAll(): Promise<Books[]> {
    return this.model.find().exec();
  }

  async delete(IBSN: string): Promise<any> {
    return this.model.deleteOne({ _IBSN: IBSN }).exec();
  }
}
