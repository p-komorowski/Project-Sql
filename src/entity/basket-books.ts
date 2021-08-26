import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany} from "typeorm";
import { Books } from "./books";
import { shoppingBasket } from "./shopping_basket";

@Entity()
export class basketBooks {

    @PrimaryGeneratedColumn()
    basket_id: number;

    @Column()
    IBSN: number;

    @OneToOne(() => Books, (books) => books.IBSN)
    books: Books[];

    @ManyToMany(()=> shoppingBasket, (shoppingBasket)=> shoppingBasket.basket_id)
    shoppingBasket: shoppingBasket[];

}