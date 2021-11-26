import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { BasketResponseDto } from '../../../modules/basket/dto';
import { UserResponseDto } from '../../../modules/user/dto/user-response.dto';

@Exclude()
export class OrderResponseDto {
  @ApiProperty({ type: String, description: 'Order ID' })
  @Expose({ name: 'id' })
  orderId: string;

  @Expose({ name: 'user' })
  @ApiProperty({ type: UserResponseDto, description: 'User ID' })
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose({ name: 'basket' })
  @ApiProperty({ type: BasketResponseDto, description: 'Basket ID' })
  @Type(() => BasketResponseDto)
  userBasket: BasketResponseDto;
}
