import { Exclude, Expose } from 'class-transformer';
import { IsEmail, isString, IsString } from 'class-validator';

@Exclude()
export class LoginDto {
  @Expose()
  @IsEmail()
  @IsString()
  email: string;
  
  @Expose()
  @IsString()
  password: string
}
