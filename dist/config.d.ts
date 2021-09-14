import { User } from "./modules/user/entities";
import { Books } from "./modules/books/entity/books.entity";
interface ConfigDBInterface {
    type: any;
    host: string;
    port: number;
    password: string;
    database: string;
    username: string;
    synchronize: boolean;
    autoLoadEntities: boolean;
}
interface ConfigInterface {
    jwtKey: string;
    database: ConfigDBInterface;
}
export declare const config: ConfigInterface;
export declare const entities: (typeof User | typeof Books)[];
export {};
