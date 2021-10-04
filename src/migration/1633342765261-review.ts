import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableReview1633342765261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS review ( 
                id UUID,
                review VARCHAR NOT NULL,
                IBSN VARCHAR NOT NULL
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE review
       `);
  }
}
