import { Schema, Document, Types } from 'mongoose';

interface Message {
    _id: Types.ObjectId;
    author: string | { name: string };
    sentAt: Date;
    text: string;
    readAt?: Date;
}

interface User {
    _id: Types.ObjectId; // или string, если вы используете string для идентификаторов
    name: string;
    email: string;
    contactPhone: string;
}

interface SupportRequest extends Document {
    id: string;
    createdAt: Date;
    isActive: boolean;
    hasNewMessages: boolean;
    _id: string;
    user: User;
    messages: Message[];
}

interface IFormattedSupportRequest {
    id: string;
    createdAt: string;
    isActive: boolean;
    hasNewMessages: boolean;
    client: {
        id: string;
        name: string;
        email: string;
        contactPhone: string;
    };
}

const SupportRequestSchema = new Schema({
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

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sentAt: { type: Date, default: Date.now, required: true },
    text: { type: String, required: true },
    readAt: { type: Date, default: null },
});

export { Message, MessageSchema, SupportRequestSchema, SupportRequest, IFormattedSupportRequest }
