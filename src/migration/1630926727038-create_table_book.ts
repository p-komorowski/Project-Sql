import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableBook1630926727038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS book (
                IBSN serial PRIMARY KEY,
                title VACHAR NOT NULL,
                price FLOAT CHECK price > 0,
                ...
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE book
       `);
    }
}
