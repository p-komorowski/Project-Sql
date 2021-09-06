import {User} from "./modules/user/entities";
import {Books} from "./modules/books/books_entity/books.entity";

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
    database: ConfigDBInterface
}

export const config: ConfigInterface = {
    jwtKey: process.env.JWT_SECRET,
    database: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.database_password,
        database: process.env.database_name,
        autoLoadEntities: true,
        synchronize: false
    }
};

/*
* config: miejsce w ktorym odczytujesz zmienne srodowsikowe z .env i stale property uzywane w projekcie
* autoLoadEntity pozwala na automatyczny odczyt encji w danym module */
export const entities = [
  User, Books
];