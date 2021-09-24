import { Exclude, Expose } from "class-transformer";
import { v4 as uuid } from "uuid";

@Exclude()
export class BasketDto {
  @Expose()
  basketId: string = uuid();

  @Expose()
  userId: string = uuid();
}
