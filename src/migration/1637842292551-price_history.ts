import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableCustomer1633342785021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "price_history" ( 
                id UUID,
                IBSN VARCHAR NOT NULL,
                current_price DECIMAL NOT NULL,
                changed_price DECIMAL NOT NULL,
                date TIMESTAMP NOT NULL
                )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE price_history
       `);
  }
}
