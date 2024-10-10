import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { HotelRoom, SearchRoomsParams } from '../hotel.interface';

@Injectable()
export class HotelRoomService implements HotelRoomService {
    constructor(@InjectModel('HotelRoom') private roomModel: Model<HotelRoom>) {}

    async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
        const room = new this.roomModel(data);
        return await room.save();
    }

    async findById(id: string): Promise<HotelRoom> {
        const hotelRoom = await this.roomModel.findById(id).exec();

        if (!hotelRoom) {
            throw new NotFoundException(`Hotel room with ID ${id} not found`);
        }

        return hotelRoom;
    }

    async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const { limit, offset, hotel, isEnabled } = params;
        const filter: any = { hotel: new Types.ObjectId(hotel) };
        if (typeof isEnabled !== 'undefined') {
            filter.isEnabled = isEnabled;
        }
        return await this.roomModel
            .find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return await this.roomModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
}
