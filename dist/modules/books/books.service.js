"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const books_repository_1 = require("./repository/books.repository");
const typeorm_1 = require("typeorm");
let BooksService = class BooksService {
    constructor(connection) {
        this.connection = connection;
        this.booksRepository = this.connection.getCustomRepository(books_repository_1.BooksRepository);
    }
    async insertProduct(newProduct) {
        return this.booksRepository.save(newProduct);
    }
    async getProducts() {
        return this.booksRepository.find();
    }
    async deleteProduct(IBSN) {
        await this.booksRepository.delete(IBSN);
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map