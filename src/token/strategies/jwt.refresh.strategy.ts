import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { RefreshPayloadType } from '../payload/refresh.payload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'refreshSecret',
    });
  }

  async validate(payload: RefreshPayloadType) {
    return await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
  }
}
