import { Books } from "src/modules/books/entity/books.entity";
import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Basket } from "./basket.entity";


@Entity()
export class BasketBooks {
  @PrimaryColumn({type: uuid})
  id: string = uuid();

  @Column({ name: "basket_id" })
  basketId: string = uuid();

  @Column()
  IBSN: string;

  @Column()
  quantity: number;

  @OneToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @OneToMany(() => Books, (books) => books.IBSN)
  books: Books[];
}
