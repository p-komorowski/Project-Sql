import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";
import { v4 as uuid } from 'uuid';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string = uuid();

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToOne(()=> ContactDetails, (contactDetails) => contactDetails.userId)
  contactDetails: ContactDetails[];
}
