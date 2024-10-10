import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelSchema } from "./hotel.schema";
import { HotelRoomSchema } from "./Rooms/hotel-room.schema";
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelRoomController } from './Rooms/hotel-room.controller';
import { HotelRoomService } from './Rooms/hotel-room.service';
import {AdminHotelRoomController} from "./RoomAdmin/hotel-room-admin.controller";
import {AdminHotelRoomService} from "./RoomAdmin/hotel-room-admin.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Hotel', schema: HotelSchema },
            { name: 'HotelRoom', schema: HotelRoomSchema }
        ])
    ],
    controllers: [HotelController, HotelRoomController, AdminHotelRoomController],
    providers: [HotelService, HotelRoomService, AdminHotelRoomService]
})
export class HotelsModule {}
