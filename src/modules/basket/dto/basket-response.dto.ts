import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BasketBookResponseDto } from './basket-book-response.dto';

@Exclude()
export class BasketResponseDto {
  @Expose({ name: 'id' })
  @ApiProperty({ type: String, description: 'Basket ID' })
  BasketID: string;

  @Expose({ name: 'basketBooks' })
  @ApiProperty({ type: BasketBookResponseDto, description: 'Basket Book' })
  @Type(() => BasketBookResponseDto)
  BooksInBasket: BasketBookResponseDto;
}
