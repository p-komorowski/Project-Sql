import { EntityRepository, Repository } from "typeorm";
import {User} from "../entities/user.entity";

// TODO
@EntityRepository(User)
export class userRepository extends Repository<User> {}

// TODO: remove 'mongoose' import