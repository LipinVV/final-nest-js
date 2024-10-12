import {Controller, Get, Delete, Param, UseGuards, Req} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RolesGuard } from "../RolesManagement/roles.guard";
import { Roles } from "../RolesManagement/roles.decorator";

@Controller('manager/reservations')
@UseGuards(RolesGuard)
export class ManagerReservationController {
    constructor(private readonly reservationsService: ReservationService) {}

    @Get(':userId')
    //     @Roles('manager')
    async getUserReservations(@Param('userId') userId: string) {
        return this.reservationsService.getManagerReservations(userId);
    }

    @Delete(':id')
    //     @Roles('manager')
    async cancelReservation(@Param('id') id: string, @Req() req) {
        const userId = req.user._doc._id.toString();
        return this.reservationsService.deleteReservation(id, userId);
    }
}
