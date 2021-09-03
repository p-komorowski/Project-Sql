import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  IBSN: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  author: string;

  @Column()
  count: number;
}
