interface ReservationResponseDto {
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
    userId: string,
}

export { ReservationResponseDto }
