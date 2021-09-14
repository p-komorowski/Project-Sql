import { Books } from "./entity/books.entity";
import { BooksService } from "./books.service";
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getAllProducts(): Promise<Books[]>;
    addProduct(productData: Books): Promise<Books>;
    removeProduct(IBSN: string): Promise<void>;
}
