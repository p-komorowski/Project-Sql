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
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const typeorm_1 = require('typeorm');
const contact_details_entity_1 = require('./contact-details.entity');
const token_entity_1 = require('../../auth/entity/token.entity');
const uuid_1 = require('uuid');
let User = class User {
  constructor(user) {
    this.id = (0, uuid_1.v4)();
    Object.assign(this, user);
  }
};
__decorate(
  [
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata('design:type', String),
  ],
  User.prototype,
  'id',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  User.prototype,
  'email',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  User.prototype,
  'name',
  void 0,
);
__decorate(
  [(0, typeorm_1.Column)(), __metadata('design:type', String)],
  User.prototype,
  'password',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => token_entity_1.Token,
      (token) => token.id,
    ),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'token',
  void 0,
);
__decorate(
  [
    (0, typeorm_1.OneToOne)(
      () => contact_details_entity_1.ContactDetails,
      (contactDetails) => contactDetails.userId,
    ),
    __metadata('design:type', Array),
  ],
  User.prototype,
  'contactDetails',
  void 0,
);
User = __decorate(
  [(0, typeorm_1.Entity)('user'), __metadata('design:paramtypes', [Object])],
  User,
);
exports.User = User;
//# sourceMappingURL=user.entity.js.map
