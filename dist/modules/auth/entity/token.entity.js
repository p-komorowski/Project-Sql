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
Object.defineProperty(exports, '__esModule', { value: true });
exports.Token = void 0;
const entities_1 = require('../../user/entities');
const typeorm_1 = require('typeorm');
const uuid_1 = require('uuid');
let Token = class Token {
    constructor(token) {
        this.id = (0, uuid_1.v4)();
        Object.assign(this, token);
    }
};
__decorate(
    [(0, typeorm_1.PrimaryColumn)(), __metadata('design:type', String)],
    Token.prototype,
    'id',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.ManyToOne)(
            () => entities_1.User,
            (user) => user.id,
        ),
        (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
        __metadata('design:type', entities_1.User),
    ],
    Token.prototype,
    'user',
    void 0,
);
__decorate(
    [(0, typeorm_1.Column)(), __metadata('design:type', String)],
    Token.prototype,
    'token',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.Column)({ name: 'exp_time' }),
        __metadata('design:type', Date),
    ],
    Token.prototype,
    'expTime',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.Column)({ name: 'last_login' }),
        __metadata('design:type', Date),
    ],
    Token.prototype,
    'lastLogin',
    void 0,
);
Token = __decorate(
    [(0, typeorm_1.Entity)(), __metadata('design:paramtypes', [Object])],
    Token,
);
exports.Token = Token;
//# sourceMappingURL=token.entity.js.map
