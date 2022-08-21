import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { RefreshPayloadType } from '../payload/refresh.payload.type';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'refreshSecret',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: RefreshPayloadType) {
    const token = request.headers.authorization.split('Bearer ')[1];
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (token !== user.refreshToken) throw new BadRequestException('refresh');
    return user;
  }
}
