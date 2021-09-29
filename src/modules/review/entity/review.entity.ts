import { Books } from "src/modules/books/entity/books.entity";
import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Review {
  @PrimaryColumn({type: uuid})
  id: string = uuid();

  @Column()
  review: string = uuid();

  @Column()
  IBSN: string;

  @ManyToOne(() => Books, (books) => books.IBSN)
  @JoinColumn()
  books: Books;

}
