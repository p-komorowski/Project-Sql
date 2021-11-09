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
var AuthModule_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthModule = void 0;
const common_1 = require('@nestjs/common');
const jwt_1 = require('@nestjs/jwt');
const passport_1 = require('@nestjs/passport');
const auth_service_1 = require('./auth.service');
const jwt_strategy_1 = require('./strategy/jwt.strategy');
const local_strategy_1 = require('./strategy/local.strategy');
const user_module_1 = require('../user/user.module');
const auth_controller_1 = require('./auth.controller');
const auth_repository_1 = require('./repository/auth.repository');
const typeorm_1 = require('@nestjs/typeorm');
const auth_strategy_1 = require('./strategy/auth.strategy');
let AuthModule = (AuthModule_1 = class AuthModule {});
AuthModule = AuthModule_1 = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        typeorm_1.TypeOrmModule,
        AuthModule_1,
        user_module_1.UserModule,
        passport_1.PassportModule,
        jwt_1.JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '600s' },
        }),
      ],
      controllers: [auth_controller_1.AuthController],
      providers: [
        auth_service_1.AuthService,
        local_strategy_1.LocalStrategy,
        jwt_strategy_1.JwtStrategy,
        auth_repository_1.AuthRepository,
        auth_strategy_1.AuthStrategy,
      ],
      exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
    }),
  ],
  AuthModule,
);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map
