import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  name: string;

  @Column({nullable:true})
  password: string;

  @OneToMany(() => Token, (token) => token.id)
  token: Token[];

  @OneToOne(()=> ContactDetails, (contactDetails) => contactDetails.userId)
  contactDetails: ContactDetails[];
}
