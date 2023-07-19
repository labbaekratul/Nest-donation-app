/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { errorHandler } from 'src/helpers/errorHanders';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private jwtSecret = { secret: process.env.JWT_SECRET_KEY };
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) return errorHandler(401);
    try {
      const payload = await this.jwtService.verifyAsync(token, this.jwtSecret);
      request['user'] = payload;
      if (payload.role === 'ADMIN' || payload.id === request.params.userId)
        return true;
      return errorHandler(401, true);
    } catch {
      return errorHandler(401, true);
    }
  }
}
