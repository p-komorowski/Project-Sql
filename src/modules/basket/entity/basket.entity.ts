import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class shoppingBasket {
  @PrimaryColumn({ name: "basket_id" })
  basketId: string = uuid();

  @Column({ name: "user_id" })
  userId: string = uuid();

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
