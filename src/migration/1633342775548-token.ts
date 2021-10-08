import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableToken1633342775548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS token ( 
                id UUID,
                user_id VARCHAR KEY REFERENCES user(id),
                last_login TIMESTAMP,
                exp_time TIMESTAMP,
                token VARCHAR
                )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE token
       `);
  }
}
