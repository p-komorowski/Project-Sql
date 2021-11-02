import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableCustomer1633342785021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "customer" ( 
                id UUID,
                email VARCHAR NOT NULL,
                name VARCHAR NOT NULL,
                password VARCHAR NOT NULL
                )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE customer
       `);
  }
}
