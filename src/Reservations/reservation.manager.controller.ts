import {Controller, Get, Delete, Param, UseGuards, Req} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { RolesGuard } from "../RolesManagement/roles.guard";
import { Roles } from "../RolesManagement/roles.decorator";

@Controller('manager/reservations')
@UseGuards(RolesGuard)
export class ManagerReservationController {
    constructor(private readonly reservationsService: ReservationService) {}

    @Get(':userId')
    @Roles('manager')
    async getUserReservations(@Param('userId') userId: string) {
        return this.reservationsService.getUserReservations(userId);
    }

    @Delete(':reservationId')
    @Roles('manager')
    async cancelReservation(@Param('reservationId') reservationId: string) {
        return this.reservationsService.deleteReservationAsManager(reservationId);
    }
}
