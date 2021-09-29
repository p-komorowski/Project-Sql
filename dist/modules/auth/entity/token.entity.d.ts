import { User } from "../../user/entities";
import { DeepPartial } from "typeorm";
import { TokenInterface } from "../interface/token.interface";
export declare class Token {
    constructor(token: DeepPartial<TokenInterface>);
    id: string;
    user: User;
    token: string;
    expTime: Date;
    lastLogin: Date;
}
