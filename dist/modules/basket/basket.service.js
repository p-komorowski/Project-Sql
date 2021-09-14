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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const basket_repository_1 = require("./repository/basket.repository");
const shopping_basket_entity_1 = require("./entity/shopping_basket.entity");
let BasketService = class BasketService {
    constructor(repository) {
        this.repository = repository;
    }
    async insertProduct(newBasket) {
        return this.repository.save(newBasket);
    }
    async getProducts() {
        return this.repository.find();
    }
    async deleteProduct(basket_id) {
        await this.repository.delete(basket_id);
    }
};
BasketService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(shopping_basket_entity_1.shoppingBasket)),
    __metadata("design:paramtypes", [basket_repository_1.BasketRepository])
], BasketService);
exports.BasketService = BasketService;
//# sourceMappingURL=basket.service.js.map