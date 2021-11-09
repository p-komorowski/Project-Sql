import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../user/enum/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BookDto } from '../book/dto/index';
import { BasketService } from './basket.service';
import { BasketDto, BasketBookDto } from './dto/index';
import { Basket,BasketBook } from './entities/index';


@ApiTags('Basket')
@Controller('basket')
export class BasketController {
    constructor(private basketService: BasketService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('add')
    @Roles(Role.User)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Insert product in basket' })
    @ApiResponse({ status: 200, description: 'Product inserted in basket.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    @ApiBody({ type: BasketBook })
    async insertProductToBasket(@Body() dto: BookDto): Promise<Basket[]> {
        return this.basketService.insertBookInBasket(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles(Role.Moderator)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all baskets' })
    @ApiResponse({ status: 201, description: 'show list of baskets' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    @ApiBody({ type: BasketDto })
    async addProduct(): Promise<Basket[]> {
        return await this.basketService.getBasket();
    }

    @Delete('/:IBSN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.User)
    @ApiOperation({ summary: 'Delete product from basket' })
    @ApiResponse({ status: 200, description: 'Product deleted from basket.' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async removeProduct(@Param('IBSN') IBSN: string): Promise<void> {
        await this.basketService.deleteBookFromBasket(IBSN);
    }

    @Patch(':IBSN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.User)
    @ApiOperation({ summary: 'Update count of book in user basket' })
    @ApiResponse({ status: 200, description: 'Count of book changed' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async updateCountOfBookInBasket(@Param('IBSN') IBSN: string, @Body() count: BasketBookDto ): Promise<BasketBook> {
        return await this.basketService.updateCountOfBookInBasket(IBSN, count);
    }

    @Get('books')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Roles(Role.User, Role.Moderator)
    @ApiOperation({ summary: 'Show all book in user basket' })
    @ApiResponse({ status: 200, description: 'show list' })
    @ApiUnauthorizedResponse({ description: 'User not logged in.' })
    async showBooksInBasket() {
        return await this.basketService.getBooksInUserBasket();
    }
}
