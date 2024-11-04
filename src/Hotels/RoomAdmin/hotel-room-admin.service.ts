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
        images: { filename: string }[],
    ): Promise<HotelRoom> {
        const existingHotel = await this.hotelModel.findById(body.hotelId) as Hotel;
        const imagePaths = images.map(file => {
            return { filename: `/uploads/${file.filename}` };
        });
        const newHotelRoom = new this.hotelRoomModel({
            hotel: existingHotel,
            images: imagePaths,
        });

        const result = await newHotelRoom.save();
        const resultedHotel = result.hotel;
        return {
            id: result._id,
            description: body.description,
            images: result.images,
            isEnabled: result.isEnabled,
            hotel: {
                id: resultedHotel.id,
                title: result.hotel.title,
                description: result.hotel.description,
            },
        } as HotelRoom;
    }

    async updateHotelRoom(
        roomId: string,
        updateHotelRoomDto: UpdateHotelRoomDto,
        images: { filename: string }[],
    ): Promise<HotelRoom> {
        const existingRoom = await this.hotelRoomModel.findById(roomId) as HotelRoom;
        const existingHotel = await this.hotelModel.findById(updateHotelRoomDto.hotelId) as Hotel;

        if (!existingRoom) {
            throw new Error('Hotel room not found');
        }

        const imagePaths = images.map(file => {
            return { filename: `/uploads/${file.filename}` };
        });
        existingRoom.description = updateHotelRoomDto.description;
        existingRoom.isEnabled = updateHotelRoomDto.isEnabled;

        existingRoom.images = [
            ...new Set([...existingRoom.images, ...imagePaths]),
        ];

        const result = await existingRoom.save();

        return {
            id: result._id,
            description: result.description,
            images: result.images,
            isEnabled: result.isEnabled,
            hotel: {
                id: existingHotel._id,
                title: existingHotel.title,
                description: existingHotel.description,
            },
        } as unknown as HotelRoom;
    }
}
