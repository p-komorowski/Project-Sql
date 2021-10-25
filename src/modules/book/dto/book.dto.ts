import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class BookDto {
  @Expose()
  @IsNumber()
  @ApiProperty({type: Number, description: 'IBSN'})
  IBSN: string;
}
