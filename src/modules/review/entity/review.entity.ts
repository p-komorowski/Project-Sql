import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Book } from "../../book/entity/book.entity";

@Entity()
export class Review {
  @PrimaryColumn()
  id: string = uuid();

  @Column()
  review: string;

  @ManyToOne(() => Book, (book) => book.review)
  book: Book;
}
