import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { UserService } from "../User/user.service";
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser, SearchUserParams } from "../User/user.interface";

@Controller(['admin/users', 'manager/users'])
@UseGuards(RolesGuard)
export class AdminController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles('admin')
    async createUser(@Body() createUserDto: CreateUserDto, @Request() req) {
        const newUser = await this.userService.create(createUserDto) as IUser;

        return {
            id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            contactPhone: newUser.contactPhone,
            role: newUser.role,
        };
    }

    @Get()
    @Roles('admin', 'manager')
    async getUsers(@Query() params: SearchUserParams, @Request() req) {
        const users = await this.userService.findAll(params);
        return users.map((user: IUser) => ({
            id: user._id,
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
        }));
    }
}
