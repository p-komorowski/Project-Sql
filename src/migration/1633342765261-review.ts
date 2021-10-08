import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableReview1633342765261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS review ( 
                id UUID,
                review VARCHAR NOT NULL,
                IBSN VARCHAR NOT NULL
                )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE review
       `);
  }
}
