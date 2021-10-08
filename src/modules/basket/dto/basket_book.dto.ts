import { Exclude, Expose } from "class-transformer";
import { v4 as uuid } from "uuid";

@Exclude()
export class BasketBooskDto {
  @Expose()
  id: string = uuid();

  @Expose({ name: "basket_id" })
  basketId: string = uuid();

  @Expose()
  IBSN: string;

  @Expose()
  quantity: number;
}
