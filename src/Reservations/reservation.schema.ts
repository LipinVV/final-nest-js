import { Document, Types, Schema } from 'mongoose';


export const ReservationSchema = new Schema({
    userId: { type: String, required: true },
    roomId: { type: Types.ObjectId, ref: 'HotelRoom', required: true },
    hotelId: { type: Types.ObjectId, ref: 'Hotel', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    hotelRoom: {
        description: String,
        images: [String]
    },
    hotel: {
        title: String,
        description: String
    }
});

export interface IReservation extends Document {
    startDate: string,
    endDate: string,
    hotelRoom: {
        description: string,
        images: string[]
    },
    hotel: {
        title: string,
        description: string
    }
}
