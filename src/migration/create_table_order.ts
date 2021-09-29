import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableOrder implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS order ( 
                order_id UUID,
                user_id UUID FOREIGN KEY REFERENCES user(id),
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
