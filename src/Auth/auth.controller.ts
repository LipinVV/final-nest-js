import { Controller, Post, Body, Get, UseGuards, Param, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from "./dto/user.dto";
import { JwtAuthGuard } from './strategy/user.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.authService.getProfile(id);
  }


  @HttpCode(HttpStatus.CREATED)
  @Post('client/register')
  async registerClient(@Body() createUserDto: UserDto) {
    return this.authService.register(createUserDto, 'client');
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('admin/register')
  async registerAdmin(@Body() createUserDto: UserDto) {
    return this.authService.register(createUserDto, 'admin');
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('manager/register')
  async registerManager(@Body() createUserDto: UserDto) {
    return this.authService.register(createUserDto, 'manager');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }, @Res({ passthrough: true }) response: Response) {
    const token = await this.authService.login(body.email, body.password);
    response.cookie('jwt', token, { httpOnly: true });
    return {
      message: 'Login successful',
      token
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
