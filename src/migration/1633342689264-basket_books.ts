import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBasketBooks1633342689264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket_books ( 
                id UUID PRIMARY KEY,
                basket_id UUID FOREIGN KEY REFERENCES basket(id),
                IBSN VARCHAR NOT NULL,
                quantity INTEGER
                )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE basket_books
       `);
  }
}
