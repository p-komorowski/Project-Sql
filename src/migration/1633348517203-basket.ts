import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableBasket1633348517203 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket ( 
                basket_id UUID,
                user_id UUID FOREIGN KEY REFERENCES user(basket_id)
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE basket
       `);
    }
}
