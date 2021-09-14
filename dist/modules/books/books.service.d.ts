import { BooksRepository } from "./repository/books.repository";
import { Books } from "./entity/books.entity";
export declare class BooksService {
    private readonly repository;
    constructor(repository: BooksRepository);
    insertProduct(newProduct: Books): Promise<Books>;
    getProducts(): Promise<Books[]>;
    deleteProduct(IBSN: string): Promise<void>;
}
