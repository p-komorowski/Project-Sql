import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuid } from "uuid";

@Exclude()
export class BasketBooksDto {
  @Expose()
  @ApiProperty({type: String, description: 'id'})
  id: string = uuid();

  @Expose({ name: "basket_id" })
  @ApiProperty({type: String, description: 'Basket id'})
  basketId: string = uuid();

  @Expose()
  @ApiProperty({type: String, description: 'IBSN'})
  IBSN: string;

  @Expose()
  @ApiProperty({type: String, description: 'Quantity'})
  quantity: number;
}
