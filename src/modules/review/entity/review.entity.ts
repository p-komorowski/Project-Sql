import { Books } from "src/modules/books/entity/books.entity";
import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Review {
  @PrimaryColumn({type: uuid})
  id: string = uuid();

  @Column()
  review: string = uuid();

  @Column()
  IBSN: string;

  @OneToMany(() => Books, (books) => books.IBSN)
  books: Books[];
}
