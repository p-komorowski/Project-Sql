import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/user.entity';

@EntityRepository(Customer)
export class UserRepository extends Repository<Customer> {}
