import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity('contact_details')
export class ContactDetails {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  adress: string;

  @Column()
  zipcode: string;

  @Column({name: 'phone_number'}) // mapowanie na nazwe kolumny w postgresie
  phoneNumber: number;

  @OneToOne(() => User, (user) => user.id)
  user: User[];
}
