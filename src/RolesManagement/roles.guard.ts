import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
const jwtDecoder = require('jsonwebtoken');

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) return true;

        const jwtCookie = context.switchToHttp().getRequest().headers['cookie'];
        if(!jwtCookie) throw new ForbiddenException('Unauthorized');
        const jwtToken = jwtCookie.slice(4, -1);
        const user = jwtDecoder.decode(jwtToken);
        if (!user) throw new ForbiddenException('Unauthorized');

        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) throw new ForbiddenException('Insufficient permissions');

        return true;
    }
}
