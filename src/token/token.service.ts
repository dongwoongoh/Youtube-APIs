import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessPayloadType } from './payload/access.payload.type';
import { RefreshPayloadType } from './payload/refresh.payload.type';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async createTokens(
    accessPayload: AccessPayloadType,
    refreshPayload: RefreshPayloadType,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: 'accessSecret',
        expiresIn: '60s',
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: 'refreshSecret',
        expiresIn: '15d',
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
