import { Basket } from "../../basket/entities/basket.entity";
import { OrderBooks } from "../../order/dto/order_books.dto";
import { Entity, Column, PrimaryColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Review } from "../../review/dto/review.dto";

@Entity()
export class Books {
  @ApiProperty({description: 'IBSN of book' })
  @PrimaryColumn()
  IBSN: number;

  @ApiProperty({description: 'Title of book' })
  @Column({ nullable: true })
  title: string;

  @ApiProperty({description: 'price of book' })
  @Column({ nullable: true })
  price: number;

  @ApiProperty({description: 'Name of author' })
  @Column({ nullable: true })
  author: string;

  @ApiProperty({description: 'count of book' })
  @Column({ nullable: true })
  count: number;

  @ManyToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @ManyToOne(() => OrderBooks, (orderBooks) => orderBooks.id)
  orderBooks: OrderBooks[];
}
