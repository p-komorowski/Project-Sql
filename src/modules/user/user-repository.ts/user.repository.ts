import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../entities/user.entity";

// TODO
@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model <User>){}
  }
}

// TODO: remove 'mongoose' import