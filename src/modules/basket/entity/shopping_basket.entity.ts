import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class shoppingBasket {
  @PrimaryGeneratedColumn()
  basket_id: number;

  @Column()
  user_id: number;

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
