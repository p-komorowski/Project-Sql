import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBasket1633348517203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket ( 
                basket_id UUID,
                user_id UUID FOREIGN KEY REFERENCES user(basket_id)
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE basket
       `);
  }
}
