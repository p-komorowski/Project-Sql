import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { get } from "http";
import { LoginDto } from "../auth/dto/login.dto";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { Books } from "../book/entity/book.entity";
import { User } from "../user/entities";
import { BasketService } from "./basket.service";
import { BasketDto } from "./dto/basket.dto";
import { BasketBooksDto } from "./dto/basket_book.dto";
import { Basket } from "./entities/basket.entity";
import { BasketBooks } from "./entities/basket_book.entity";

@ApiTags('Basket')
@Controller("basket")
export class BasketController {
  constructor(private basketService: BasketService, private bookService:BooksService) {}
  
  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Insert product in basket' })
  @ApiResponse({status:200, description:'Product inserted in basket.'})
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiBody({type: BasketBooks})
  async insertProductToBasket(@Body() dto:BookDto): Promise<Basket[]> {
    return this.basketService.insertBookInBasket(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all baskets' })
  @ApiResponse({ status: 201, description: 'show list of baskets' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiBody({type: BasketDto})
  async addProduct(): Promise<Basket[]> {
    return await this.basketService.getBasket();
  }

  
  @Delete("delete")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product from basket' })
  @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async removeProduct(@Param("basket_id") basket_id: BasketBooks): Promise<void> {
    await this.basketService.deleteBasket(basket_id);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete("delete/book")
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete product from basket' })
  // @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
  // @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  // async removeBookd(@Param("IBSN") IBSN: string) {
  //   await this.basketService.deleteBasket(IBSN);
  // }

  @Get('test')
  async getAllProducts(id:LoginDto): Promise<User> {
    return await this.basketService.getUser(id);
  }
}
