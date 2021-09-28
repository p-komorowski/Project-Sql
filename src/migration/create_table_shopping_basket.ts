import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableShoppingBasket implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS shopping_basket ( 
                basket_id PRIMARY KEY,
                user_id INTEGER,
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE shopping_basket
       `);
  }
}
