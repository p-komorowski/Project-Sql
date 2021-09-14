import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Books } from "./entity/books.entity";
import { BooksService } from "./books.service";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}
  @Get()
  async getAllProducts(): Promise<Books[]> {
    return await this.booksService.getProducts();
  }

  @Post()
  async addProduct(@Body() productData: Books): Promise<Books> {
    return this.booksService.insertProduct(productData);
  }

  @Delete("/:IBSN")
  async removeProduct(
      @Param("IBSN") IBSN: string
  ): Promise<void> {
    await this.booksService.deleteProduct(IBSN);
  }
}
