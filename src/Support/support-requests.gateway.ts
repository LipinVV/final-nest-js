import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './support-request.schema';

interface IClient {
    id: string,
    name: string,
    join: (is: string) => void
}

@WebSocketGateway()
export class SupportRequestGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: IClient) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: IClient) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('subscribeToChat')
    async handleSubscribeToChat(client: IClient, payload: { chatId: string }) {
        client.join(payload.chatId);
        console.log(`Client ${client.id} subscribed to chat ${payload.chatId}`);
    }

    public async sendMessage(chatId: string, message: Message) {
        if (typeof message.author !== "string") {
            this.server.to(chatId).emit('message', {
                id: message._id.toString(),
                createdAt: message.sentAt.toISOString(),
                text: message.text,
                readAt: message.readAt,
                author: {
                    id: message.author.toString(),
                    name: message.author.name,
                },
            });
        }
    }
}
