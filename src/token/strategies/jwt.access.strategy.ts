import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AccessPayloadType } from '../payload/access.payload.type';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'accessSecret',
    });
  }

  async validate(payload: AccessPayloadType) {
    return await this.prisma.user.findUnique({ where: { id: payload.id } });
  }
}
