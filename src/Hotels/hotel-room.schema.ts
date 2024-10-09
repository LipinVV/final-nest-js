import { Schema, Document } from 'mongoose';
import { Types } from 'mongoose';

export const HotelRoomSchema = new Schema({
    hotel: { type: Types.ObjectId, ref: 'Hotel', required: true },
    description: { type: String, required: false },
    images: { type: [String], default: [] },
    isEnabled: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export interface HotelRoom extends Document {
    readonly _id: string;
    readonly hotel: Types.ObjectId;
    readonly description?: string;
    readonly images: string[];
    readonly isEnabled: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
