import { Exclude, Expose } from "class-transformer";
import { IsNumber,} from "class-validator";

@Exclude()
export class BasketDto {

@Expose()
@IsNumber()
 basketId:number;

 @Expose()
 @IsNumber()
 userId:number;
}