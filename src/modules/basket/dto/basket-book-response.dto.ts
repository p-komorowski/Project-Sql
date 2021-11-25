import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BookResponseDto } from '../../book/dto/book-response.dto';

@Exclude()
export class BasketBookResponseDto {
  @Expose({ name: 'book' })
  @ApiProperty({ type: String, description: 'id' })
  @Type(() => BookResponseDto)
  BookDescription: BookResponseDto;
}
