import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../common/roles.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  issueDevToken(role: Role, subject: string) {
    return this.jwt.sign({ role }, { subject });
  }
}

