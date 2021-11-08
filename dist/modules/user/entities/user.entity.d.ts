import { DeepPartial } from 'typeorm';
import { ContactDetails } from './contact-details.entity';
import { Token } from '../../auth/entity/token.entity';
import { UserInterface } from '../interface/user.interface';
export declare class User {
    constructor(user: DeepPartial<UserInterface>);
    id: string;
    email: string;
    name: string;
    password: string;
    token: Token[];
    contactDetails: ContactDetails[];
}
