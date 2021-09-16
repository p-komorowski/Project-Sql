import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  IBSN: number;

  @Column({nullable:true})
  title: string;

  @Column({nullable:true})
  price: number;

  @Column({nullable:true})
  author: string;

  @Column({nullable:true})
  count: number;
}
