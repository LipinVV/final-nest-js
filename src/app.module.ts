import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./User/user.module";
import { RolesManagementModule } from "./RolesManagement/roles.module";
import { AuthModule } from "./Auth/auth.module";
import { HotelsModule } from "./Hotels/hotels.module";
import { ReservationModule } from "./Reservations/reservation.module";
import { SupportRequestsModule } from "./Support/support-requests.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    RolesManagementModule,
    AuthModule,
    HotelsModule,
    ReservationModule,
    SupportRequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
