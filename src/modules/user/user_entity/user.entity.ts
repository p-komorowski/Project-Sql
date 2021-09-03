import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { contactDetails } from "./contact-details.entity";
import { Token } from "../../auth/auth_entity/token.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToOne(()=> contactDetails, (contactDetails) => contactDetails.user_id)
  contactDetails: contactDetails[];
}
