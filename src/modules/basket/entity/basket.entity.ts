import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class shoppingBasket {
  @PrimaryGeneratedColumn({name: 'basket_id'})
  basketId: number;

  @Column({name: 'user_id'})
  userId: number;

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
