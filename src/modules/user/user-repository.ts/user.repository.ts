import { Injectable,NotFoundException  } from "@nestjs/common";
import { InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import * as bcrypt from 'bcrypt';
import { User } from "../user_entity/user.entity";
import { RegisterDto } from "../../auth/dto/register.dto";


@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userModel: Model <User>){}
    
  
  async create(newUser: RegisterDto): Promise<any> {
    const userReg = await this.userModel.findOne({ email: newUser.email });
    if (!userReg) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUser.password, salt);
      const addedUser = new this.userModel({
        ...newUser,
        password: hashedPassword,
      });
      return addedUser
    } else {
      throw new NotFoundException('email already in database');
    }
  }
  async save(doc: RegisterDto): Promise<User> {
    const product = new this.userModel(doc);
    return product.save();
  }
}
