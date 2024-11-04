import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { SearchRoomsParams } from "../hotel.interface";

@Controller('common/hotel-rooms')
export class HotelRoomController {
    constructor(private readonly roomService: HotelRoomService) {}

    @Get()
    searchRooms(@Query() query: SearchRoomsParams) {
        return this.roomService.search({ limit: +query.limit, offset: +query.offset, hotel: query.hotel });
    }

    @Get(':id')
    getRoom(@Param('id') id: string) {
        return this.roomService.findById(id);
    }
}
