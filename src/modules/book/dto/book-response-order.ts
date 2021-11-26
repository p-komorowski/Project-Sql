import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class BookOrderResponseDto {
  @Expose()
  @ApiProperty({ type: String, description: 'IBSN' })
  IBSN: string;

  @Expose({ name: 'price' })
  @ApiProperty({ type: Number, description: 'Number of book' })
  price: number;

  @Expose({ name: 'count' })
  @ApiProperty({ type: Number, description: 'Count of book' })
  count: number;

}