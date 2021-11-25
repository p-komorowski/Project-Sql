import { EntityRepository, Repository } from 'typeorm';
import { PriceHistory } from '../entities/price-history.entity';

@EntityRepository(PriceHistory)
export class PriceHistoryRepository extends Repository<PriceHistory> {}
