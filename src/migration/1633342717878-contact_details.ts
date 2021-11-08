import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableContactDetails1633342717878
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS contact_details ( 
                user_id PRIMARY KEY,
                adress VARCHAR NOT NULL,
                zipcode VARCHAR NOT NULL,
                phone_number INTEGER
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE contact_details
       `);
    }
}
