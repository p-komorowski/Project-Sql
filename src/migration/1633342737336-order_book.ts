import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableOrderBooks1633342737336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS order_books ( 
                id UUID PRIMARY KEY,
                order_id UUID,
                IBSN VARCHAR NOT NULL,
                quantity INTEGER
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE order_books
       `);
  }
}
