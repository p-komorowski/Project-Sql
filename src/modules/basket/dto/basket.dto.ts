import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';

@Exclude()
export class BasketDto {
  @Expose()
  @ApiProperty({ type: String, description: 'Basket_id', nullable: false })
  basketId: string = uuid();

  @Expose()
  @ApiProperty({ type: String, description: 'User_id', nullable: false })
  userId: string = uuid();

  @Expose()
  IBSN: string = uuid();
}
