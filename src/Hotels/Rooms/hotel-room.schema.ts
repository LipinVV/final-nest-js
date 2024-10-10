import { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export const HotelRoomSchema = new Schema({
    hotel: { type: Types.ObjectId, ref: 'Hotel', required: true },
    description: { type: String, required: false },
    images: { type: [String], default: [] },
    isEnabled: { type: Boolean, default: true },
});

export interface HotelRoom extends Document {
    readonly id: string;
    hotel: {
        id: Types.ObjectId;
        title: string;
        description: string;
    }
    description?: string;
    images: string[];
    isEnabled: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
