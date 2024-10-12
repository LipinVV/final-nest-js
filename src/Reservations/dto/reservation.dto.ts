export class CreateReservationDto {
    hotelRoom: string;
    startDate: string;
    endDate: string;
}

export class ReservationResponseDto {
    startDate: string;
    endDate: string;
    hotelRoom: {
        description: string;
        images: string[];
    };
    hotel: {
        title: string;
        description: string;
    };
}
