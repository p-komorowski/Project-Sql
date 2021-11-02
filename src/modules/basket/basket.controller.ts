import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BooksService } from "../book/book.service";
import { BookDto } from "../book/dto/book.dto";
import { BasketService } from "./basket.service";
import { BasketDto } from "./dto/basket.dto";
import { BasketBookDto } from "./dto/basket_book.dto";
import { Basket } from "./entities/basket.entity";
import { BasketBook } from "./entities/basket_book.entity";

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
  @ApiBody({type: BasketBook})
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

  
  @Delete("/:IBSN")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product from basket' })
  @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async removeProduct(@Param("IBSN") IBSN: string): Promise<void> {
    await this.basketService.deleteBookFromBasket(IBSN);
  }

  @Patch(":IBSN")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update count of book in user basket' })
  @ApiResponse({ status: 200, description: 'Count of book changed' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async updateCountOfBookInBasket( @Param('IBSN') IBSN: string, @Body() count: BasketBookDto ){
   return await this.basketService.updateCountOfBookInBasket(IBSN, count);
  };

  @Get('books')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show all book in user basket' })
  @ApiResponse({ status: 200, description: 'show list' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async showBooksInBasket () {
    return await this.basketService.booksInUserBasket();
  }
}

