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
var AuthController_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthController = void 0;
const common_1 = require('@nestjs/common');
const auth_service_1 = require('./auth.service');
const login_dto_1 = require('./dto/login.dto');
const register_dto_1 = require('./dto/register.dto');
const passport_1 = require('@nestjs/passport');
const jwt_1 = require('@nestjs/jwt');
let AuthController = (AuthController_1 = class AuthController {
  constructor(authService, jwtService) {
    this.authService = authService;
    this.jwtService = jwtService;
    this.logger = new common_1.Logger(AuthController_1.name);
  }
  async register(reqisterDto) {
    this.logger.warn('logger test warn');
    return this.authService.register(reqisterDto);
  }
  async login(loginDto, response) {
    const token = await this.authService.login(loginDto);
    response
      .cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 60000 * 10),
      })
      .send({ success: true });
  }
  login1(response) {
    const userId = 'userId';
    const payload = { userId: userId };
    const token = this.jwtService.sign(payload);
    response
      .cookie('access_token', token, {
        httpOnly: true,
        domain: 'localhost',
        expires: new Date(Date.now() + 60000 * 10),
      })
      .send({ success: true });
  }
  devices() {
    this.logger.log('logger test');
    return 'test cookie';
  }
});
__decorate(
  [
    (0, common_1.Post)('auth/register'),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [register_dto_1.RegisterDto]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'register',
  null,
);
__decorate(
  [
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_1.Body)()),
    __param(0, (0, common_1.Res)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [login_dto_1.LoginDto, Object]),
    __metadata('design:returntype', Promise),
  ],
  AuthController.prototype,
  'login',
  null,
);
__decorate(
  [
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Res)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  AuthController.prototype,
  'login1',
  null,
);
__decorate(
  [
    (0, common_1.Post)('hello'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', String),
  ],
  AuthController.prototype,
  'devices',
  null,
);
AuthController = AuthController_1 = __decorate(
  [
    (0, common_1.Controller)(),
    __metadata('design:paramtypes', [
      auth_service_1.AuthService,
      jwt_1.JwtService,
    ]),
  ],
  AuthController,
);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
