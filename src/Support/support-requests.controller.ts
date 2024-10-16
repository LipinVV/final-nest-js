import { Controller, Post, Get, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { SupportRequestsService } from './support-requests.service';
import { JwtAuthGuard } from "../Auth/strategy/user.guard";
import { RolesGuard } from "../RolesManagement/roles.guard";
import { Roles } from "../RolesManagement/roles.decorator";

@Controller()
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class SupportRequestsController {
    constructor(private readonly supportRequestsService: SupportRequestsService) {}

    @Post('client/support-requests')
    @Roles('client')
    async createSupportRequest(@Request() req, @Body('text') text: string) {
        const userId = req.user._doc._id.toString();
        return this.supportRequestsService.createSupportRequest(userId, text);
    }

    @Get('client/support-requests')
    @Roles('client')
    async getClientSupportRequests(
        @Request() req,
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('isActive') isActive?: boolean,
    ) {
        const userId = req.user._doc._id.toString();
        return this.supportRequestsService.getClientSupportRequests(userId, limit, offset, isActive);
    }

    @Get('manager/support-requests')
    @Roles('manager')
    async getManagerSupportRequests(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('isActive') isActive?: boolean,
    ) {
        return this.supportRequestsService.getManagerSupportRequests(limit, offset, isActive);
    }

    @Get('common/support-requests/:id/messages')
    @Roles('client', 'manager')
    async getMessages(@Request() req, @Param('id') supportRequestId: string) {
        const userEntity = req.user._doc;
        const authorId = userEntity._id.toString();
        return this.supportRequestsService.getMessagesBySupportRequestId(supportRequestId, authorId);
    }

    @Post('common/support-requests/:id/messages')
    @Roles('client', 'manager')
    async sendMessage(
        @Request() req,
        @Param('id') supportRequestId: string,
        @Body('text') text: string,
    ) {
        const userEntity = req.user._doc;
        const authorId = userEntity._id.toString();
        const userRole = userEntity.role;
        return this.supportRequestsService.sendMessageToSupportRequest(supportRequestId, authorId, text, userRole);
    }

    @Post('common/support-requests/:id/messages/read')
    async markMessagesAsRead(
        @Param('id') supportRequestId: string,
        @Body('createdBefore') createdBefore: string,
    ) {
        return this.supportRequestsService.markMessagesAsRead(supportRequestId, new Date(createdBefore));
    }
}
