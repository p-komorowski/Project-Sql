import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookOrderResponseDto } from '../../book/dto';

@Exclude()
export class BasketBookResponseDto {
  @Expose({ name: 'count' })
  @ApiProperty({ type: String, description: 'Count of book in basket' })
  countOfBookInBasket: string;

  @Expose({ name: 'book' })
  @ApiProperty({ type: String, description: 'id' })
  @Type(() => BookOrderResponseDto)
  bookDescription: BookOrderResponseDto;
}
