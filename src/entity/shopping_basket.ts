import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { basketBooks } from "./basket-books";
import { User } from "./User";

@Entity()
export class shoppingBasket {

    @PrimaryGeneratedColumn()
    basket_id: number;

    @Column()
    user_id: number;

    @OneToMany(() => User, (user) => user.id)
    user: User[];

    @ManyToMany(() => basketBooks, (basketBooks) => basketBooks.basket_id)
    basketBooks: basketBooks[];

}