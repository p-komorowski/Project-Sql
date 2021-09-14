"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("./modules/user/entities");
const books_entity_1 = require("./modules/books/entity/books.entity");
exports.config = {
    jwtKey: process.env.JWT_SECRET,
    database: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.database_password,
        database: process.env.database_name,
        autoLoadEntities: true,
        synchronize: false
    }
};
exports.entities = [
    entities_1.User, books_entity_1.Books
];
//# sourceMappingURL=config.js.map