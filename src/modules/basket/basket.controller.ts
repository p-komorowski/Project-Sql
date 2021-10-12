import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BooksService } from "../book/book.service";
import { Books } from "../book/entity/book.entity";
import { BasketService } from "./basket.service";
import { BasketDto } from "./dto/basket.dto";
import { BasketBooks } from "./entities/basket_book.entity";

@ApiTags('Basket')
@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService, private bookService:BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get products in basket' })
  @ApiResponse({status:200, description:'Get Products from basket.'})
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiBody({type: BasketBooks})
  async getAllProducts(): Promise<Books[]> {
    return await this.bookService.getProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add product' })
  @ApiResponse({ status: 201, description: 'Product added.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiBody({type: BasketDto})
  async addProduct(@Body() productData: BasketDto): Promise<string> {
    return this.basketService.insertProduct(productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("basket/delete")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product from basket' })
  @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async removeProduct(@Param("basket_id") basket_id: string) {
    await this.basketService.deleteProduct(basket_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("basket/delete/book")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product from basket' })
  @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async removeBookd(@Param("IBSN") IBSN: string) {
    await this.basketService.deleteProduct(IBSN);
  }
}
