import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class Review {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  review: string;

  @Expose()
  @IsString()
  IBSN: string;
}
