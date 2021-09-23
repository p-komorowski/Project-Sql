import { User } from "../../user/entities";
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, DeepPartial} from "typeorm";
import { v4 as uuid } from 'uuid';
import { TokenInterface } from "../interface/token.interface";

@Entity()
export class Token {
    constructor(token: DeepPartial<TokenInterface>) {
        Object.assign(this, token);
      }

    @PrimaryColumn()
    id: string = uuid();
   
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'userId'})
    user:User  
   
    @Column()
    token: string;

    @Column()
    expTime: Date;

    @Column()
    lastLogin: Date;
}