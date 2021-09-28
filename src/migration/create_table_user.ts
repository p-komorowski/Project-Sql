import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUser implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user ( 
                id PRIMARY KEY,
                email VARCHAR NOT NULL,
                name VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE user
       `);
  }
}
