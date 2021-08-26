import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { basketBooks } from "./basket-books";

@Entity()
export class Books {

    @PrimaryGeneratedColumn()
    IBSN: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    author: string;

    @Column()
    count: number;

    @OneToOne(()=> basketBooks, (basketBooks) => basketBooks.basket_id)
    basketBooks: basketBooks[];

}