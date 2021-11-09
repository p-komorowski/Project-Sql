import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { v4 as uuid } from 'uuid';

@Exclude()
export class BasketBookDto {
  @Expose()
  @ApiProperty({ type: String, description: 'id' })
  id: string = uuid();

  @Expose()
  IBSN: string;

  @Expose()
  @ApiProperty({ type: String, description: 'Count' })
  @IsOptional()
  count?: number;
}
