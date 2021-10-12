import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class BookDto {
  @Expose()
  @IsNumber()
  @ApiProperty({type: Number, description: 'IBSN'})
  IBSN: number;

  @Expose()
  @IsString()
  @ApiProperty({type: String, description: 'Title'})
  title: string;

  @Expose()
  @IsNumber()
  @ApiProperty({type: Number, description: 'Price'})
  price: number;

  @Expose()
  @IsString()
  @ApiProperty({type: String, description: 'Author'})
  author: string;

  @Expose()
  @IsNumber()
  @ApiProperty({type: Number, description: 'Count'})
  count: number;
}
