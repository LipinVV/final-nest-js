import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../User/user.service';
import { UserDto } from "./dto/user.dto";
import { randomBytes, pbkdf2Sync } from 'crypto';
import { IUser } from "../User/user.interface";

@Injectable()
export class AuthService {
  constructor(
      private userService: UserService,
      private jwtService: JwtService,
  ) {}

  private hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  }

  private generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  async register(createUserDto: UserDto, role: string) {
    const existingUser = await this.userService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new BadRequestException('Email is already taken');
    }
    const salt = this.generateSalt();
    createUserDto.password = this.hashPassword(createUserDto.password, salt);

    const user = await this.userService.create({ ...createUserDto, role, salt } as IUser) as IUser;

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.sign({ id: user._id, email: user.email, role: user.role });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const hashedPassword = this.hashPassword(password, user.salt);
      if (hashedPassword === user.password) {
        return user;
      }
    }
    return null;
  }

  async getProfile(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, salt, ...result } = user;
    return result;
  }

  async getUserProfileByEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { password, salt, ...profile } = user;
    return profile;
  }
}
