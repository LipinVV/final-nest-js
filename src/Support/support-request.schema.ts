import { Schema, Document, Types } from 'mongoose';

export interface Message {
    _id: Types.ObjectId;
    author: string;
    sentAt: Date;
    text: string;
    readAt?: Date;
}

export interface SupportRequest extends Document {
    id: string;
    createdAt: Date;
    isActive: boolean;
    hasNewMessages: boolean;
    _id: string;
    user: string;
    messages: Message[];
}

export const SupportRequestSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    messages: [
        {
            _id: Schema.Types.ObjectId,
            author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            sentAt: { type: Date, default: Date.now, required: true },
            text: { type: String, required: true },
            readAt: { type: Date },
        },
    ],
    isActive: { type: Boolean, default: true },
    hasNewMessages: { type: Boolean, default: false }
});

export const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sentAt: { type: Date, default: Date.now, required: true },
    text: { type: String, required: true },
    readAt: { type: Date, default: null },
});
