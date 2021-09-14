import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    token: string;

    @Column()
    expTime: string;

    @Column()
    lastLogin: string;

    @Column()
    password: string;

}