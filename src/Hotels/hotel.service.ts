import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, IHotelService, SearchHotelParams, UpdateHotelParams } from './hotel.interface';

@Injectable()
export class HotelService implements IHotelService {
    constructor(@InjectModel('Hotel') private hotelModel: Model<Hotel>) {}

    async create(data: Partial<Hotel>): Promise<Hotel> {
        const hotelDraft = await new this.hotelModel(data).save();
        const hotel = {
            id: hotelDraft._id,
            title: hotelDraft.title,
            description: hotelDraft.description
        }

        return hotel as any;
    }

    async findById(id: string): Promise<Hotel> {
        return await this.hotelModel.findById(id).exec();
    }

    async search(params: SearchHotelParams): Promise<Hotel[]> {
        const { limit, offset, title } = params;
        const hotels = await this.hotelModel
            .find({ title: new RegExp(title, 'i') })
            .skip(offset)
            .limit(limit)
            .exec();

        return hotels.map(hotel => {
            return { id: hotel._id, title: hotel.title, description: hotel.description } as any
        })
    }

    async update(id: string, data: UpdateHotelParams): Promise<Hotel> {
        const hotelDraft = await this.hotelModel.findByIdAndUpdate(id, data, { new: true }).exec();
        const hotel = {
            id: hotelDraft._id,
            title: hotelDraft.title,
            description: hotelDraft.description
        }

        return hotel as any;
    }
}