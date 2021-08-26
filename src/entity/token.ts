import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    token: string;

    @Column()
    exp_time: string;

    @Column()
    last_login: string;

}