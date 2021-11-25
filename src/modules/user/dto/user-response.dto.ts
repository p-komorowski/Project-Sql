import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose({ name: 'id' })
  @ApiProperty()
  UserID: string;
}
