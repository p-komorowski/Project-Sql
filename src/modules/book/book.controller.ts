import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Book } from './entity/book.entity';
import { BooksService } from './book.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ReviewDto } from '../review/dto/review.dto';
import { Review } from '../review/entity/review.entity';
import { BookPriceDto, BookDto } from './dto/index';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../user/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeleteReviewDto } from '../order/dto/delete-order.dto';
import { ReviewService } from '../review/review.service';

@ApiBearerAuth()
@ApiTags('Books')
@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
        private reviewService: ReviewService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all products.' })
    @ApiResponse({ status: 200, description: 'Getting all products.' })
    async getAllProducts( @Query('page') page: number, @Query('take') take: number ): Promise<Book[]> {
        return this.booksService.getProducts(page, take);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles(Role.Moderator)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Insert product' })
    @ApiResponse({ status: 201, description: 'Insert product.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    @ApiBody({ type: BookDto })
    async addProduct(@Body() productData: BookDto): Promise<Book> {
        return this.booksService.insertProduct(productData);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:IBSN')
    @Roles(Role.Moderator)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete product' })
    @ApiResponse({ status: 200, description: 'Product deleted.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async removeProduct(@Param('IBSN') IBSN: string): Promise<void> {
        await this.booksService.deleteProduct(IBSN);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch('price/:IBSN')
    @Roles(Role.Moderator)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change price of book' })
    @ApiResponse({ status: 200, description: 'Price Changed.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async changePriceOfBook(@Param('IBSN') IBSN: string, @Body() price: BookPriceDto ): Promise<Book> {
        return this.booksService.changePriceOfBook(IBSN, price.price);
    }

    @Post('review')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Place review for book' })
    @ApiResponse({ status: 200, description: 'Review placed.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async addReviewToBook(@Body() reviewDto: ReviewDto): Promise<Review> {
        return this.reviewService.addReviewToBook(reviewDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('review/:IBSN')
    @Roles(Role.Moderator)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete review for book' })
    @ApiResponse({ status: 200, description: 'Review deleted.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async removeReviewForBook(@Param('IBSN') IBSN: string, @Body() reviewDto: DeleteReviewDto ): Promise<Review[]> {
        return this.reviewService.deleteReviews(IBSN, reviewDto.review_ids);
    }
}
