'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.BasketController = void 0;
const common_1 = require('@nestjs/common');
const jwt_auth_guard_1 = require('../auth/strategy/jwt-auth.guard');
const basket_service_1 = require('./basket.service');
const basket_dto_1 = require('./dto/basket.dto');
let BasketController = class BasketController {
  constructor(basketService) {
    this.basketService = basketService;
  }
  async getAllProducts() {
    return await this.basketService.getProducts();
  }
  async addProduct(productData) {
    return this.basketService.insertProduct(productData);
  }
  async removeProduct(basket_id) {
    await this.basketService.deleteProduct(basket_id);
  }
};
__decorate(
  [
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  BasketController.prototype,
  'getAllProducts',
  null,
);
__decorate(
  [
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [basket_dto_1.BasketDto]),
    __metadata('design:returntype', Promise),
  ],
  BasketController.prototype,
  'addProduct',
  null,
);
__decorate(
  [
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':basket_id'),
    __param(0, (0, common_1.Param)('basket_id')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  BasketController.prototype,
  'removeProduct',
  null,
);
BasketController = __decorate(
  [
    (0, common_1.Controller)('basket'),
    __metadata('design:paramtypes', [basket_service_1.BasketService]),
  ],
  BasketController,
);
exports.BasketController = BasketController;
//# sourceMappingURL=basket.controller.js.map
