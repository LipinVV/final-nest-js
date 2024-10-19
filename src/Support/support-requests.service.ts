import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SupportRequest, Message } from "./support-request.schema";

@Injectable()
export class SupportRequestsService {
    constructor(
        @InjectModel('SupportRequest')
        private readonly supportRequestModel: Model<SupportRequest>,
    ) {}

    async createSupportRequest(userId: string, text: string): Promise<SupportRequest> {
        const newRequest = new this.supportRequestModel({
            user: userId,
            messages: [{ _id: new Types.ObjectId(), author: userId, text, sentAt: new Date() }],
            isActive: true,
            hasNewMessages: true,
        });
        const completedRequest = await newRequest.save() as any;

        return {
            id: completedRequest._id,
            createdAt: completedRequest.createdAt,
            hasNewMessages: completedRequest.hasNewMessages,
            isActive: completedRequest.isActive,
        } as any;
    }

    async getClientSupportRequests(
        userId: string,
        limit: number,
        offset: number,
        isActive?: boolean,
    ): Promise<SupportRequest[]> {
        const query: any = { user: userId };
        if (isActive !== undefined) {
            query.isActive = isActive;
        }
        const supportRequests = await this.supportRequestModel
            .find(query)
            .skip(offset)
            .limit(limit)
            .exec() as any;

        return supportRequests.map((request) => ({
            id: request._id.toString(),
            createdAt: request.createdAt.toISOString(),
            isActive: request.isActive,
            hasNewMessages: request.hasNewMessages,
        }));
    }

    async getManagerSupportRequests(
        limit: number,
        offset: number,
        isActive?: boolean,
    ): Promise<SupportRequest[]> {
        const query: any = {};
        if (isActive !== undefined) {
            query.isActive = isActive;
        }
        const supportRequests = await this.supportRequestModel
            .find(query)
            .populate('user', 'name email contactPhone')
            .skip(offset)
            .limit(limit)
            .exec() as any;

        return supportRequests.map((request) => ({
            id: request._id.toString(),
            createdAt: request.createdAt.toISOString(),
            isActive: request.isActive,
            hasNewMessages: request.hasNewMessages,
            client: {
                id: request.user._id.toString(),
                name: request.user.name,
                email: request.user.email,
                contactPhone: request.user.contactPhone,
            },
        }));
    }

    async getMessagesBySupportRequestId(supportRequestId: string, authorId: string): Promise<Message[]> {
        const supportRequest = await this.supportRequestModel.findById(supportRequestId).exec() as any;

        if (!supportRequest || supportRequest.user.toString() !== authorId) {
            throw new NotFoundException('Support request not found');
        }
        return supportRequest.messages.map((message: any) => ({
            id: message._id.toString(),
            createdAt: message.sentAt.toISOString(),
            text: message.text,
            readAt: message.readAt,
            author: {
                id: message.author.toString(),
                name: supportRequest.user.name
            }
        }));
    }

    async sendMessageToSupportRequest(
        supportRequestId: string,
        authorId: string,
        text: string,
        userRole: string,
    ): Promise<Message> {
        const supportRequest = await this.supportRequestModel
            .findById(supportRequestId)
            .populate('user', 'name')
            .exec() as any;

        if (!supportRequest || (userRole !== 'client' && supportRequest)) {
            throw new NotFoundException('Support request not found');
        }

        const newMessage: Message = {
            _id: new Types.ObjectId(),
            author: authorId,
            text,
            sentAt: new Date(),
        };

        supportRequest.messages.push(newMessage);
        await supportRequest.save();

        return {
            id: newMessage._id.toString(),
            createdAt: newMessage.sentAt.toISOString(),
            text: newMessage.text,
            readAt: 'not read',
            author: {
                id: supportRequest.user._id.toString(),
                name: supportRequest.user.name,
            }
        } as any;
    }

    async markMessagesAsRead(supportRequestId: string, readBefore: Date): Promise<{ success: true }> {
        const supportRequest = await this.supportRequestModel.findById(supportRequestId).exec() as any;
        if (!supportRequest) {
            throw new NotFoundException('Support request not found');
        }

        supportRequest.messages = supportRequest.messages.map((message) => {
            if (!message.readAt && message.sentAt <= readBefore) {
                message.readAt = new Date();
            }
            return message;
        });
        console.log(supportRequest)
        await supportRequest.save();
        return { success: true };
    }
}
