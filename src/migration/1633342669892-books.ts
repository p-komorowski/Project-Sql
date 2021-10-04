import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBooks1633342669892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS books (
        IBSN serial PRIMARY KEY,
        title VARCHAR NOT NULL,
        price DECIMAL,
        author VARCHAR NOT NULL,
        count INTEGER
        )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE books
       `);
  }
}
