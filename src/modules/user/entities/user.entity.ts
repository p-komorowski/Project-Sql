import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeepPartial} from "typeorm";
import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";
import { v4 as uuid } from "uuid";
import { UserInterface } from "../interface/user.interface";
import { Books } from "src/modules/books/entity/books.entity";
import { Basket } from "src/modules/basket/entities/basket.entity";
import { Order } from "src/modules/order/entity/order.entity";

@Entity("user")
export class User {
  constructor(user: DeepPartial<UserInterface>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string = uuid();

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @OneToMany(() => Order, (order) => order.id)
  order: Order[];

  @OneToOne(() => ContactDetails, (contactDetails) => contactDetails.userId)
  contactDetails: ContactDetails[];
}
