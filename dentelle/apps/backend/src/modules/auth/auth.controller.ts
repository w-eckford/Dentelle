import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Role } from '../../common/roles.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('dev-login')
  devLogin(@Body() body: { role: Role; subject: string }) {
    return { token: this.auth.issueDevToken(body.role, body.subject) };
  }
}

