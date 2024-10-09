import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
const jwtDecoder = require('jsonwebtoken');

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('requiredRoles', requiredRoles)
        if (!requiredRoles) return true;

        const jwtCookie = context.switchToHttp().getRequest().headers['cookie'];
        console.log('jwtCookie', jwtCookie)
        if(!jwtCookie) throw new ForbiddenException('Unauthorized');
        const jwtToken = jwtCookie.slice(4, -1);
        const user = jwtDecoder.decode(jwtToken);
        console.log('user', user)
        if (!user) throw new ForbiddenException('Unauthorized');

        const hasRole = requiredRoles.includes(user.role);
        console.log('hasRole', hasRole)
        if (!hasRole) throw new ForbiddenException('Insufficient permissions');

        return true;
    }
}
