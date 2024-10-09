import { Schema, Document } from 'mongoose';

export const HotelSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export interface Hotel extends Document {
    readonly _id: string;
    readonly title: string;
    readonly description?: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
