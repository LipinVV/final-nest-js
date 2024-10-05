import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { IUserService, SearchUserParams } from './user.interface';

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(data: Partial<User>): Promise<User> {
        const newUser = new this.userModel(data);
        return newUser.save();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(params: SearchUserParams): Promise<User[]> {
        const { limit, offset, email, name, contactPhone } = params;

        // Поиск по частичному совпадению
        const filter: Record<string, any> = {};
        if (email) filter.email = new RegExp(email, 'i');
        if (name) filter.name = new RegExp(name, 'i');
        if (contactPhone) filter.contactPhone = new RegExp(contactPhone, 'i');

        return this.userModel
            .find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
    }
}
