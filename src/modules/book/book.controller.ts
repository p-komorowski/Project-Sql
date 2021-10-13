import { Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import { Books } from "./entity/book.entity";
import { BooksService } from "./book.service";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { BookDto } from "./dto/book.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Roles } from "../auth/decorators/role.decorator";
import { Role } from "../auth/strategy/models/role.enum";
import { RolesGuard } from "../auth/strategy/roles.guard";


@ApiBearerAuth()
@ApiTags('Books')
@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Roles(Role.User,Role.Moderator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiOperation({ summary: 'Get all products.' })
  @ApiResponse({ status: 200, description: 'Getting all products.' })
  async getAllProducts(): Promise<Books[]> {
    return await this.booksService.getProducts();
  }

  
  
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Insert product' })
  @ApiResponse({ status: 201, description: 'Insert product.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  @ApiBody({type: BookDto})
  async addProduct(@Body() productData: BookDto): Promise<Books> {
    return this.booksService.insertProduct(productData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:IBSN")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Product deleted.' })
  @ApiUnauthorizedResponse({ description: 'User not logged in.' })
  async removeProduct(@Param("IBSN") IBSN: string): Promise<void> {
    await this.booksService.deleteProduct(IBSN);
  }
}
