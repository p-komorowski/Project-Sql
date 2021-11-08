import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contact_details')
export class ContactDetails {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column({ nullable: true })
    adress: string;

    @Column({ nullable: true })
    zipcode: string;

    @Column({ nullable: true, name: 'phone_number' })
    phoneNumber: number;
}
