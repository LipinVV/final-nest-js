// скорее всего очередные конфликты с Docker, надо разбираться

// import {
//     WebSocketGateway,
//     WebSocketServer,
//     SubscribeMessage,
//     MessageBody,
// } from '@nestjs/websockets';
// import { SupportRequestsService } from './support-requests.service';
// import { Server } from 'socket.io';

//@WebSocketGateway()
export class SupportRequestsGateway {
    // @WebSocketServer() server: Server;
    //
    // constructor(private readonly supportRequestsService: SupportRequestsService) {}

    // @SubscribeMessage('subscribeToChat')
    // async handleChatSubscription(@MessageBody('chatId') chatId: string) {
    //     const messages = await this.supportRequestsService.getMessagesBySupportRequestId(chatId) as any;
    //     this.server.emit('chatMessages', messages);
    // }
}
