/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAdmin = request.user.role;
    if (isAdmin.role === 'ADMIN') return true;
    throw new UnauthorizedException({ message: 'Unauthorized' });
  }
}
