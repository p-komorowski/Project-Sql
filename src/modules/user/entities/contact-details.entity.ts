import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class contactDetails {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  adress: string;

  @Column()
  zipcode: string;

  @Column()
  phone_number: number;

  @OneToOne(() => User, (user) => user.id)
  user: User[];
}
