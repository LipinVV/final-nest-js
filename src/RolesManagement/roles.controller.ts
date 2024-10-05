import { Controller, Post, Get, Body, Query, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UserService } from "../User/user.service";
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserParams } from "../User/user.interface";

@Controller('api/admin/users')
@UseGuards(RolesGuard)
export class AdminController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Roles('admin')
    async createUser(@Body() createUserDto: CreateUserDto, @Request() req) {
        if (req.user.role !== 'admin') {
            throw new ForbiddenException('You do not have permissions to create a user');
        }
        const newUser = await this.userService.create(createUserDto);
        return {
            email: newUser.email,
            name: newUser.name,
            contactPhone: newUser.contactPhone,
            role: newUser.role,
        };
    }

    @Get()
    @Roles('admin', 'manager')
    async getUsers(@Query() params: SearchUserParams, @Request() req) {
        const role = req.user.role;
        if (role !== 'admin' && role !== 'manager') {
            throw new ForbiddenException('You do not have permissions to access the user list');
        }

        const users = await this.userService.findAll(params);
        return users.map(user => ({
            email: user.email,
            name: user.name,
            contactPhone: user.contactPhone,
        }));
    }
}
