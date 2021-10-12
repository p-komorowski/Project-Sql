import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

@Exclude()
export class RegisterDto {
  @Expose()
  @IsEmail()
  @ApiProperty({type: String, description: 'email'})
  email: string;

  @Expose()
  @IsString()
  @ApiProperty({type: String, description: 'password'})
  password: string;

  @Expose()
  @IsString()
  @ApiProperty({type: String, description: 'name'})
  name: string;
}
