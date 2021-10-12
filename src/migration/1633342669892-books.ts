import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBooks1633342669892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS books (
        IBSN serial PRIMARY KEY FOREIGN KEY REFERENCES review(IBSN),
        title VARCHAR NOT NULL,
        price DECIMAL,
        author VARCHAR NOT NULL,
        count INTEGER
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE books
       `);
  }
}
