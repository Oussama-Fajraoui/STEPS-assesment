import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(user: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username }).exec();
    }
}
