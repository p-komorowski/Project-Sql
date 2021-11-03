import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Book } from "./entity/book.entity";
import { BooksService } from "./book.service";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BookDto } from "./dto/book.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ReviewDto } from "../review/dto/review.dto";
import { Review } from "../review/entity/review.entity";
import { BookPriceDto } from "./dto/bookPrice.dto";
import { Roles } from "../auth/decorators/role.decorator";
import { Role } from "../auth/strategy/models/role.enum";
import { RolesGuard } from "../auth/strategy/roles.guard";


@ApiBearerAuth()
@ApiTags("Books")
@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  @Roles(Role.User)
  @ApiOperation({ summary: "Get all products." })
  @ApiResponse({ status: 200, description: "Getting all products." })
  async getAllProducts(): Promise<Book[]> {
    return await this.booksService.getProducts();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Insert product" })
  @ApiResponse({ status: 201, description: "Insert product." })
  @ApiUnauthorizedResponse({ description: "User not logged in." })
  @ApiBody({ type: BookDto })
  async addProduct(@Body() productData: BookDto): Promise<Book> {
    return this.booksService.insertProduct(productData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("/:IBSN")
  @Roles(Role.Moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete product" })
  @ApiResponse({ status: 200, description: "Product deleted." })
  @ApiUnauthorizedResponse({ description: "User not logged in." })
  async removeProduct(@Param("IBSN") IBSN: string): Promise<void> {
    await this.booksService.deleteProduct(IBSN);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("price/:IBSN")
  @Roles(Role.Moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change price of book" })
  @ApiResponse({ status: 200, description: "Price Changed." })
  @ApiUnauthorizedResponse({ description: "User not logged in." })
  async changePriceOfBook(@Param("IBSN") IBSN: string, @Body() price: BookPriceDto ): Promise<Book> {
    return await this.booksService.changePriceOfBook(IBSN, price.price);
  }

  @Post("review")
  @ApiBearerAuth()
  @ApiOperation({ summary: "Place review for book" })
  @ApiResponse({ status: 200, description: "Review placed." })
  @ApiUnauthorizedResponse({ description: "User not logged in." })
  async addReviewToBook(@Body() reviewDto: ReviewDto): Promise<Review> {
    return await this.booksService.addReviewToBook(reviewDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("review/:id")
  @Roles(Role.Moderator)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete review for book" })
  @ApiResponse({ status: 200, description: "Review deleted." })
  @ApiUnauthorizedResponse({ description: "User not logged in." })
  async removeReviewForBook(@Param("id") id: string): Promise<void> {
    await this.booksService.deleteReview(id);
  }
  
}
