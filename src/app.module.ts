import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./User/user.module";
import { RolesManagementModule } from "./RolesManagement/roles.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    RolesManagementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
