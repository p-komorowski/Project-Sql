import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBasketBooks implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket_books ( 
                basket_id UUID,
                IBSN VARCHAR NOT NULL,
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE basket_books
       `);
  }
}
