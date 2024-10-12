import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
    UseGuards,
    Req,
} from '@nestjs/common';
import { ReservationService } from "./reservation.service";
import { CreateReservationDto } from "./dto/reservation.dto";
import { RolesGuard } from "../RolesManagement/roles.guard";
import { Roles } from "../RolesManagement/roles.decorator";
import { JwtAuthGuard } from "../Auth/strategy/user.guard";

@Controller('client/reservations')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class ClientReservationController {
    constructor(private readonly reservationsService: ReservationService) {}

    @Post()
    @Roles('client')
    async createReservation(@Body() createReservationDto: CreateReservationDto, @Req() req) {
        const userId = req.user._doc._id.toString();
        return this.reservationsService.addReservation(userId, createReservationDto);
    }

    @Get()
    @Roles('client')
    async getReservations(@Req() req) {
        console.log('*', req.user._doc)
        const userId = req.user._doc._id.toString();
        return this.reservationsService.getUserReservations(userId);
    }

    @Delete(':id')
    @Roles('client')
    async cancelReservation(@Param('id') id: string, @Req() req) {
        const userId = req.user._doc._id.toString();

        return this.reservationsService.deleteReservation(id, userId);
    }
}
