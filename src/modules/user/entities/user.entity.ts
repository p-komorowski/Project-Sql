import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeepPartial, JoinColumn } from "typeorm";
import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";
import { v4 as uuid } from "uuid";
import { UserInterface } from "../interface/user.interface";
import { Basket } from "../../basket/entities/basket.entity";
import { Order } from "../../order/entity/order.entity";
import { Role } from "../../auth/strategy/models/role.enum";

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

  @Column({type:'enum', enum:Role, default: Role.User})
  role:Role;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToMany(() => Basket, (basket) => basket.basketId)
  basket: Basket[];

  @OneToMany(() => Order, (order) => order.id)
  order: Order[];

  @OneToOne(() => ContactDetails)
  @JoinColumn()
  contactDetails: ContactDetails[];
}
