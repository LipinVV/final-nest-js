import {Controller, Get, Post, Put, Param, Body, Query, UseGuards} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Roles } from "../RolesManagement/roles.decorator";
import { RolesGuard } from "../RolesManagement/roles.guard";

@Controller('admin/hotels')
@UseGuards(RolesGuard)
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    @Post()
    @Roles('admin')
    createHotel(@Body() body: any) {
        return this.hotelService.create(body);
    }

    @Get()
    @Roles('admin')
    getHotels(@Query() query: any) {
        return this.hotelService.search({ limit: +query.limit, offset: +query.offset, title: query.title });
    }

    @Put(':id')
    @Roles('admin')
    updateHotel(@Param('id') id: string, @Body() body: any) {
        return this.hotelService.update(id, body);
    }
}
