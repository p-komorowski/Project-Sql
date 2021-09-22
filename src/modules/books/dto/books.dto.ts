import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class BookDto {
  @Expose()
  @IsNumber()
  IBSN: number;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsNumber()
  price: number;

  @Expose()
  @IsString()
  author: string;

  @Expose()
  @IsNumber()
  count: number;
}
