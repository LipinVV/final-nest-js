import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';
import { HotelSchema } from "./hotel.schema";
import { HotelRoomSchema } from "./hotel-room.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Hotel', schema: HotelSchema },
            { name: 'HotelRoom', schema: HotelRoomSchema }
        ])
    ],
    controllers: [HotelController, HotelRoomController],
    providers: [HotelService, HotelRoomService]
})
export class HotelsModule {}
