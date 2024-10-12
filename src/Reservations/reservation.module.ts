import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationSchema } from "./reservation.schema";
import { ClientReservationController } from "./reservation.client.controller";
import { ManagerReservationController } from "./reservation.manager.controller";
import { HotelSchema } from "../Hotels/hotel.schema";
import { HotelRoomSchema } from "../Hotels/Rooms/hotel-room.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Reservation', schema: ReservationSchema },
            { name: 'Hotel', schema: HotelSchema },
            { name: 'HotelRoom', schema: HotelRoomSchema }
        ]),
    ],
    controllers: [ClientReservationController, ManagerReservationController],
    providers: [ReservationService],
})
export class ReservationModule {}
