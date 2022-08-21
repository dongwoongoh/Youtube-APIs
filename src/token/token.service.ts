import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AccessPayloadType } from './payload/access.payload.type';
import { RefreshPayloadType } from './payload/refresh.payload.type';
import { JwtService } from '@nestjs/jwt';
import { CreateTokenOutputDto } from './dtos/create.token.dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async createTokens(
    accessPayload: AccessPayloadType,
    refreshPayload: RefreshPayloadType,
  ): Promise<CreateTokenOutputDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: 'accessSecret',
        expiresIn: '30s',
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
