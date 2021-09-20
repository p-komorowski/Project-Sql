import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class shoppingBasket {
  @PrimaryColumn({name: 'basket_id'})
  basketId: number;

  @Column({name: 'user_id',nullable:true})
  userId: number;

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
