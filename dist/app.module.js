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
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const app_controller_1 = require('./app.controller');
const config_1 = require('./config');
const auth_module_1 = require('./modules/auth/auth.module');
const auth_repository_1 = require('./modules/auth/repository/auth.repository');
const basket_module_1 = require('./modules/basket/basket.module');
const books_module_1 = require('./modules/books/books.module');
const user_module_1 = require('./modules/user/user.module');
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule.forRoot(config_1.config.database),
        auth_module_1.AuthModule,
        user_module_1.UserModule,
        books_module_1.BooksModule,
        basket_module_1.BasketModule,
      ],
      controllers: [app_controller_1.AppController],
      providers: [auth_repository_1.AuthRepository],
    }),
  ],
  AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
