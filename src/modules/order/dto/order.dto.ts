import { Column, Entity } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class OrderBooksDto {
    @Column({ name: 'order_id' })
    orderId: string = uuid();

    @Column({ name: 'user_id' })
    userId: string = uuid();
}
