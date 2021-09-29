import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableToken implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // sukces
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS token ( 
                id PRIMARY KEY,
                user_id VARCHAR NOT NULL KEY REFERENCES user(id),
                last_login TIMESTAMP,
                exp_time TIMESTAMP,
                token VARCHAR
                )
        `); // <- kod SQLowy
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback
    await queryRunner.query(`
        DROP TABLE token
       `);
  }
}
