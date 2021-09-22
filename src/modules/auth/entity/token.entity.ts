import {Entity, Column, PrimaryColumn} from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity()
export class Token {

    @PrimaryColumn()
    id: string = uuid();

    @Column()
    userId: string = uuid();

    @Column()
    token: string;

    @Column()
    expTime: string;

    @Column()
    lastLogin: string;

    @Column()
    password: string;

}