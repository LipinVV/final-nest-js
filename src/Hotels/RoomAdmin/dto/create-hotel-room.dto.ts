import {Types} from "mongoose";

export class CreateHotelRoomDto {
    description: string;
    hotelId: Types.ObjectId;
}
