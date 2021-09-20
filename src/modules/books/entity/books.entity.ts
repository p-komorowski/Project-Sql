import { Entity, Column,PrimaryColumn } from "typeorm";

@Entity()
export class Books {
  @PrimaryColumn()
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
