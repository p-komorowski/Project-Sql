import { Books } from "../../book/entity/book.entity";
import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Basket } from "./basket.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class BasketBooks {
  @PrimaryColumn()
  @ApiProperty({type: String, description: 'Id'})
  id: string = uuid();

  @Column({ name: "basket_id" })
  @ApiProperty({type: String, description: 'Basket id'})
  basketId: string = uuid();

  @Column()
  @ApiProperty({type: String, description: 'IBSN'})
  IBSN: string;

  @Column()
  @ApiProperty({type: Number, description: 'Quantity'})
  quantity: number;

  @OneToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @OneToMany(() => Books, (books) => books.IBSN)
  books: Books[];
}
