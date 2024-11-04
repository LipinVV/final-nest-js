import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupportRequestsController } from "./support-requests.controller";
import { SupportRequestsService } from "./support-requests.service";
import { SupportRequestSchema } from "./support-request.schema";
import { MessageSchema } from "./support-request.schema";
import { SupportRequestGateway } from "./support-requests.gateway";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'SupportRequest', schema: SupportRequestSchema },
            { name: 'Message', schema: MessageSchema },
        ]),
    ],
    controllers: [SupportRequestsController],
    providers: [SupportRequestsService, SupportRequestGateway],
})
export class SupportRequestsModule {}
