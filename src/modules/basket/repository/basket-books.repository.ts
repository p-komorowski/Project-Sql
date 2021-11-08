import { EntityRepository, Repository } from 'typeorm';
import { Basket } from '../entities/basket.entity';

@EntityRepository(Basket)
export class BasketRepository extends Repository<Basket> {}
