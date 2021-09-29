import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBasketBooks implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket_books ( 
                id UUID PRIMARY KEY,
                basket_id UUID FOREIGN KEY REFERENCES basket(id),
                IBSN VARCHAR NOT NULL,
                quantity NUMBER,
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
