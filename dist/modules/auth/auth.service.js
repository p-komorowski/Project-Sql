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
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.decorate === 'function'
        )
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i]))
                    r =
                        (c < 3
                            ? d(r)
                            : c > 3
                            ? d(target, key, r)
                            : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (
            typeof Reflect === 'object' &&
            typeof Reflect.metadata === 'function'
        )
            return Reflect.metadata(k, v);
    };
var __rest =
    (this && this.__rest) ||
    function (s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === 'function')
            for (
                var i = 0, p = Object.getOwnPropertySymbols(s);
                i < p.length;
                i++
            ) {
                if (
                    e.indexOf(p[i]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(s, p[i])
                )
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const common_1 = require('@nestjs/common');
const jwt_1 = require('@nestjs/jwt');
const bcrypt = require('bcrypt');
const typeorm_1 = require('typeorm');
const users_service_1 = require('../user/users.service');
const token_entity_1 = require('./entity/token.entity');
const auth_repository_1 = require('./repository/auth.repository');
let AuthService = class AuthService {
    constructor(userService, jwtService, connection) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.connection = connection;
        this.authRepository = this.connection.getCustomRepository(
            auth_repository_1.AuthRepository,
        );
    }
    async validateUser(user, pass) {
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password } = user,
                result = __rest(user, ['password']);
            return result;
        } else {
            throw new common_1.NotFoundException('Incorrect password or email');
        }
    }
    async register(userData) {
        const userReg = await this.userService.findByEmail(userData.email);
        if (!userReg) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            userData.password = hashedPassword;
            const newUser = this.userService.create(userData);
        } else {
            throw new common_1.BadRequestException('email already in database');
        }
    }
    async login(user) {
        const payload = { sub: user.email, pass: user.password };
        const userEntity = await this.userService.findByEmail(user.email);
        const valUser = await this.validateUser(userEntity, user.password);
        const token = await this.jwtService.sign(payload);
        const newToken = await this.addNewToken(userEntity, token);
        if (valUser) {
            return {
                token,
            };
        } else {
            throw new common_1.NotFoundException('cannot validate');
        }
    }
    async addNewToken(user, jwt) {
        const newTime = new Date();
        const time = new Date(newTime.getTime() + 60000 * 10);
        const addedToken = new token_entity_1.Token({
            token: jwt,
            expTime: time,
            lastLogin: newTime,
            user: user,
        });
        this.authRepository.create(addedToken);
        return this.authRepository.save(addedToken);
    }
};
AuthService = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [
            users_service_1.UsersService,
            jwt_1.JwtService,
            typeorm_1.Connection,
        ]),
    ],
    AuthService,
);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
