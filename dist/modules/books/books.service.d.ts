import { Books } from './entity/books.entity';
import { Connection } from 'typeorm';
import { BookDto } from './dto/books.dto';
export declare class BooksService {
    private readonly connection;
    private booksRepository;
    constructor(connection: Connection);
    insertProduct(newProduct: BookDto): Promise<Books>;
    getProducts(): Promise<Books[]>;
    deleteProduct(IBSN: string): Promise<void>;
}
