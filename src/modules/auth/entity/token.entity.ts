import { Customer } from '../../user/entities';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, DeepPartial } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { TokenInterface } from '../interface/token.interface';

@Entity()
export class Token {
    constructor(token: DeepPartial<TokenInterface>) {
        Object.assign(this, token);
    }

    @PrimaryColumn()
    id: string = uuid();

    @ManyToOne(() => Customer, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    user: Customer;

    @Column()
    token: string;

    @Column({ name: 'exp_time' })
    expTime: Date;

    @Column({ name: 'last_login' })
    lastLogin: Date;
}
