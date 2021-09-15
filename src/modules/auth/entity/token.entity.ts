import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column()
    token: string;

    @Column({name: 'exp_time'})
    expTime: string;

    @Column({name: 'last_login'})
    lastLogin: string;

    @Column()
    password: string;

}