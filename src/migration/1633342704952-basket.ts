import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableBasket1633342704952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS basket ( 
                basket_id UUID,
                user_id UUID
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
