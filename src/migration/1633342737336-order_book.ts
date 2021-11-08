import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableOrderBooks1633342737336 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS order_books ( 
                id UUID PRIMARY KEY,
                order_id UUID FOREIGN KEY REFERENCES order(order_id),
                IBSN VARCHAR NOT NULL,
                quantity INTEGER
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE order_books
       `);
    }
}
