import {
    Controller,
    Post,
    Put,
    Body,
    Param,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminHotelRoomService } from "./hotel-room-admin.service";
import { CreateHotelRoomDto } from "./dto/create-hotel-room.dto";
import { UpdateHotelRoomDto } from "./dto/update-hotel-room.dto";
import * as path from 'path';

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
    },
});

@Controller('admin/hotel-rooms')
export class AdminHotelRoomController {
    constructor(private readonly adminHotelRoomService: AdminHotelRoomService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('images', 10, { storage }) as any)
    async createHotelRoom(
        @Body() createHotelRoomDto: CreateHotelRoomDto,
        @UploadedFiles() images: string[],
    ) {
        return this.adminHotelRoomService.createHotelRoom(createHotelRoomDto, images);
    }

    @Put('/:id')
    @UseInterceptors(FilesInterceptor('images', 10, { storage }) as any)
    async updateHotelRoom(
        @Param('id') id: string,
        @Body() updateHotelRoomDto: UpdateHotelRoomDto,
        @UploadedFiles() images: any,
    ) {
        return this.adminHotelRoomService.updateHotelRoom(id, updateHotelRoomDto, images);
    }
}
