import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class BookDto {
  @Expose()
  @IsNumber()
  @ApiProperty({type: Number, description: 'IBSN'})
  IBSN: string;

  @Expose()
  @IsString()
  @ApiProperty({description: 'Title of book' })
  title: string;

  @Expose()
  @IsNumber()
  @ApiProperty({description: 'price of book' })
  price: number;

  @Expose()
  @IsString()
  @ApiProperty({description: 'Name of author' })
  author: string;

  @Expose()
  @IsNumber()
  @ApiProperty({description: 'count of book' })
  count: number;
}