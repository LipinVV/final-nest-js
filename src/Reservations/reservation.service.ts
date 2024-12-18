import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from "./dto/reservation.dto";
import { Hotel } from "../Hotels/hotel.schema";
import { HotelRoom } from "../Hotels/Rooms/hotel-room.schema";
import { ReservationResponseDto } from "./reservation.interface";

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel('Reservation') private readonly reservationModel: Model<ReservationResponseDto>,
        @InjectModel('HotelRoom') private readonly hotelRoomModel: Model<HotelRoom>,
        @InjectModel('Hotel') private readonly hotelModel: Model<Hotel>,
    ) {}

    async addReservation(userId: string, createReservationDto: CreateReservationDto) {
        const { hotelRoom, startDate, endDate } = createReservationDto;

        const existingRoom = await this.hotelRoomModel.findById(hotelRoom) as HotelRoom;

        if(!existingRoom) {
            throw new BadRequestException(`There is no room with such ID: ${hotelRoom}`);
        }

        const roomPart = {
            description: existingRoom.description,
            images: existingRoom.images
        }

        const relatedHotelId = existingRoom.hotel.toString();
        const relatedHotel = await this.hotelModel.findById(relatedHotelId) as Hotel;

        const hotelPart = {
            title: relatedHotel.title,
            description: relatedHotel.description
        }

        const reservationToSave = new this.reservationModel({
            userId,
            roomId: hotelRoom,
            hotelId: relatedHotelId,
            startDate,
            endDate,
            hotelRoom: roomPart,
            hotel: hotelPart
        });


       await reservationToSave.save();

        const reservationToReturn = {
            startDate: startDate,
            endDate: endDate,
            hotelRoom: roomPart,
            hotel: hotelPart
        };

        return reservationToReturn;
    }

    async getUserReservations(userId: string) {
        return await this.reservationModel.find({ userId }).exec();
    }

    async deleteReservation(id: string, userId: string) {
        const allReservations = await this.reservationModel.find({ userId }).exec();
        if(allReservations.every(reservation => reservation.userId !== userId)) {
            throw new ForbiddenException('Insufficient permissions, this user cannot delete a reservation');
        }
        const result = await this.reservationModel.findByIdAndDelete(id);
        if (!result) {
            throw new BadRequestException(`There is no reservation with such ID: ${id}`);
        }
    }

    async deleteReservationAsManager(id: string) {
        const result = await this.reservationModel.findByIdAndDelete(id);
        if (!result) {
            throw new BadRequestException(`There is no reservation with such ID: ${id}`);
        }
    }
}
