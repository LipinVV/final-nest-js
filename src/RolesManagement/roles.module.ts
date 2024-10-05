import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "../User/user.schema";
import { UserService } from "../User/user.service";
import { AdminController } from './roles.controller';
import { RolesGuard } from "./roles.guard";
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [AdminController],
    providers: [
        UserService,
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class RolesManagementModule {}
