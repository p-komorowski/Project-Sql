import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class OrderBooks {
  @PrimaryColumn()
  id: string = uuid();

  @Column({ name: "order_id" })
  orderId: string = uuid();

  @Column()
  IBSN: string;

  @Column()
  quantity: number;
}
