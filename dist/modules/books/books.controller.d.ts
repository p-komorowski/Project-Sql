import { Books } from './entity/books.entity';
import { BooksService } from './books.service';
import { BookDto } from './dto/books.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getAllProducts(): Promise<Books[]>;
    addProduct(productData: BookDto): Promise<Books>;
    removeProduct(IBSN: string): Promise<void>;
}
