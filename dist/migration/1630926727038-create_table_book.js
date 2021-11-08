'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.createTableBook1630926727038 = void 0;
class createTableBook1630926727038 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS book ( 
                IBSN serial PRIMARY KEY,
                title VARCHAR NOT NULL,
                price FLOAT CHECK price > 0,
                ...
                )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DROP TABLE book
       `);
    }
}
exports.createTableBook1630926727038 = createTableBook1630926727038;
//# sourceMappingURL=1630926727038-create_table_book.js.map
