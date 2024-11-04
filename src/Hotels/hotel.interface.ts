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
    create(data: Partial<Hotel>): Promise<Hotel | IFormattedHotel>;
    findById(id: string): Promise<Hotel>;
    search(params: SearchHotelParams): Promise<Hotel[] | IFormattedHotel[]>;
    update(id: string, data: UpdateHotelParams): Promise<Hotel | IFormattedHotel>;
}

interface SearchRoomsParams {
    limit: number;
    offset: number;
    hotel: string;
    isEnabled?: boolean;
}

interface ISearchRoomsParamsFilter extends Omit<SearchRoomsParams, 'limit' | 'offset'>{
    hotel: string;
    isEnabled?: boolean;
}

interface IHotelRoomService {
    create(data: Partial<HotelRoom>): Promise<HotelRoom>;
    findById(id: string): Promise<HotelRoom>;
    search(params: SearchRoomsParams): Promise<HotelRoom[]>;
    update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}

interface IFormattedHotel extends Omit<Hotel, '_id' | 'createdAt' | 'updatedAt'> {
    id: string;
    title: string;
    description?: string;
}

export { SearchHotelParams, UpdateHotelParams, SearchRoomsParams, HotelRoom, IHotelRoomService, IHotelService, Hotel, IFormattedHotel, ISearchRoomsParamsFilter }
