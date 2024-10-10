import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateHotelRoomDto } from "./dto/update-hotel-room.dto";
import { HotelRoom } from "../Rooms/hotel-room.schema";
import { Hotel } from "../hotel.schema";
import { CreateHotelRoomDto } from "./dto/create-hotel-room.dto";

@Injectable()
export class AdminHotelRoomService {
    constructor(
        @InjectModel('HotelRoom') private readonly hotelRoomModel: Model<HotelRoom>,
        @InjectModel('Hotel') private hotelModel: Model<Hotel>,
    ) {}

    async createHotelRoom(
        body: CreateHotelRoomDto,
        images: any,
    ): Promise<HotelRoom> {
        const existingHotel = await this.hotelModel.findById(body.hotelId) as any;
        const imagePaths = images.map(file => `/uploads/${file.filename}`);
        const newHotelRoom = new this.hotelRoomModel({
            hotel: existingHotel,
            images: imagePaths,
        });

        const result = await newHotelRoom.save() as any;
        return {
            id: result._id,
            description: body.description,
            images: result.images,
            isEnabled: result.isEnabled,
            hotel: {
                id: result.hotel._id,
                title: result.hotel.title,
                description: result.hotel.description,
            },
        } as any;
    }

    async updateHotelRoom(
        roomId: string,
        updateHotelRoomDto: UpdateHotelRoomDto,
        images: any,
    ): Promise<HotelRoom> {
        const existingRoom = await this.hotelRoomModel.findById(roomId) as HotelRoom;
        if (!existingRoom) {
            throw new Error('Hotel room not found');
        }

        const imagePaths = images.map(file => `/uploads/${file.filename}`);
        existingRoom.description = updateHotelRoomDto.description;
        existingRoom.isEnabled = updateHotelRoomDto.isEnabled;

        existingRoom.images = [
            ...new Set([...updateHotelRoomDto.images, ...imagePaths]),
        ];

        return existingRoom.save();
    }
}
