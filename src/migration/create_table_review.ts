import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBooks1630926727038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS books ( 
                id SERIAL UUID,
                review VARCHAR NOT NULL,
                IBSN VARCHAR NOT NULL
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
