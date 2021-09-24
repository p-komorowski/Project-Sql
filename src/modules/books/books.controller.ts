import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Books } from "./entity/books.entity";
import { BooksService } from "./books.service";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BookDto } from "./dto/books.dto";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts(): Promise<Books[]> {
    return await this.booksService.getProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addProduct(@Body() productData: BookDto): Promise<Books> {
    console.log(productData);
    return this.booksService.insertProduct(productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:IBSN")
  async removeProduct(@Param("IBSN") IBSN: string): Promise<void> {
    await this.booksService.deleteProduct(IBSN);
  }
}
