import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber } from "class-validator";

@Exclude()
export class BookPriceDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ description: "price of book" })
  price: number;
}
