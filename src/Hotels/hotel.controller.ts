import {Controller, Get, Post, Put, Param, Body, Query, UseGuards} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Roles } from "../RolesManagement/roles.decorator";
import { RolesGuard } from "../RolesManagement/roles.guard";
import { Hotel } from "./hotel.schema";
import { SearchHotelParams, UpdateHotelParams } from "./hotel.interface";

@Controller('admin/hotels')
@UseGuards(RolesGuard)
export class HotelController {
    constructor(private readonly hotelService: HotelService) {}

    @Post()
    @Roles('admin')
    createHotel(@Body() body: Partial<Hotel>) {
        return this.hotelService.create(body);
    }

    @Get()
    @Roles('admin')
    getHotels(@Query() query: SearchHotelParams) {
        return this.hotelService.search({ limit: +query.limit, offset: +query.offset, title: query.title });
    }

    @Put(':id')
    @Roles('admin')
    updateHotel(@Param('id') id: string, @Body() body: UpdateHotelParams) {
        return this.hotelService.update(id, body);
    }
}
