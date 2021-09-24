import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsString, Matches } from "class-validator";

@Exclude()
export class RegisterDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  /* @Matches(/^[a-z]+[!@#$%^&*()=_{}:;"'<,.>?€]$/g,{message: "test"}) */
  password: string;

  @Expose()
  @IsString()
  name: string
}
