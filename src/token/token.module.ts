import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PrismaService } from '../prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt.access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.register({ secret: 'secret' }),
  ],
  providers: [
    TokenService,
    PrismaService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  exports: [TokenService],
})
export class TokenModule {}
