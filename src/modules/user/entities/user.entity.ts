import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, DeepPartial } from "typeorm";
import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";
import { v4 as uuid } from 'uuid';
import { UserInterface } from "../interface/user.interface";

@Entity('user')
export class User {
  constructor(user: DeepPartial<UserInterface>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToOne(()=> ContactDetails, (contactDetails) => contactDetails.userId)
  contactDetails: ContactDetails[];
}
