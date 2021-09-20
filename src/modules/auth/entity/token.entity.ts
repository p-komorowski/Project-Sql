import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Token {

    @PrimaryColumn()
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