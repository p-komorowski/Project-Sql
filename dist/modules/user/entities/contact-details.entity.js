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
exports.ContactDetails = void 0;
const typeorm_1 = require('typeorm');
const user_entity_1 = require('./user.entity');
let ContactDetails = class ContactDetails {};
__decorate(
    [
        (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'user_id' }),
        __metadata('design:type', Number),
    ],
    ContactDetails.prototype,
    'userId',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata('design:type', String),
    ],
    ContactDetails.prototype,
    'adress',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata('design:type', String),
    ],
    ContactDetails.prototype,
    'zipcode',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.Column)({ nullable: true, name: 'phone_number' }),
        __metadata('design:type', Number),
    ],
    ContactDetails.prototype,
    'phoneNumber',
    void 0,
);
__decorate(
    [
        (0, typeorm_1.OneToOne)(
            () => user_entity_1.User,
            (user) => user.id,
        ),
        __metadata('design:type', Array),
    ],
    ContactDetails.prototype,
    'user',
    void 0,
);
ContactDetails = __decorate(
    [(0, typeorm_1.Entity)('contact_details')],
    ContactDetails,
);
exports.ContactDetails = ContactDetails;
//# sourceMappingURL=contact-details.entity.js.map
