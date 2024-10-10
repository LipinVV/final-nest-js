import { Hotel } from "./hotel.schema";
import { HotelRoom } from "./Rooms/hotel-room.schema";

interface SearchHotelParams {
    limit: number;
    offset: number;
    title: string;
}

interface UpdateHotelParams {
    title: string;
    description: string;
}

interface IHotelService {
    create(data: any): Promise<Hotel>;
    findById(id: string): Promise<Hotel>;
    search(params: SearchHotelParams): Promise<Hotel[]>;
    update(id: string, data: UpdateHotelParams): Promise<Hotel>;
}

interface SearchRoomsParams {
    limit: number;
    offset: number;
    hotel: string;
    isEnabled?: boolean;
}

interface HotelRoomService {
    create(data: Partial<HotelRoom>): Promise<HotelRoom>;
    findById(id: string): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<HotelRoom[]>;
    update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}


export { SearchHotelParams, UpdateHotelParams, SearchRoomsParams, HotelRoom, HotelRoomService, IHotelService, Hotel }
