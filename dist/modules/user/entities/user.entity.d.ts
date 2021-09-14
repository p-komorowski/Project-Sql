import { ContactDetails } from "./contact-details.entity";
import { Token } from "../../auth/entity/token.entity";
export declare class User {
    id: number;
    email: string;
    name: string;
    password: string;
    token: Token[];
    contactDetails: ContactDetails[];
}
