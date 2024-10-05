import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { SearchUserParams } from './user.interface';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() user: Partial<User>): Promise<User> {
        return this.userService.create(user);
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(id);
    }

    @Get('/email/:email')
    async findByEmail(@Param('email') email: string): Promise<User | null> {
        return this.userService.findByEmail(email);
    }

    @Get()
    async findAll(@Query() params: SearchUserParams): Promise<User[]> {
        return this.userService.findAll(params);
    }
}
