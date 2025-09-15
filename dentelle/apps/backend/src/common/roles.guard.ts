import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] as string | undefined;
    if (!auth || !auth.startsWith('Bearer ')) return false;
    const token = auth.slice(7);
    try {
      const payload = this.jwt.verify(token, { secret: process.env.JWT_SECRET || 'dev_jwt_secret' });
      req.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}

