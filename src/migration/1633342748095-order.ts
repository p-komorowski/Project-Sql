import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableOrder1633342748095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "order" ( 
                order_id UUID, 
                user_id UUID 
                )
        `);
  }
  // dodać reference
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE books
       `);
  }
}
