import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    JwtModule.register({ secret: 'secret' }),
  ],
  providers: [TokenService, AccessStrategy, RefreshStrategy],
  exports: [TokenService],
})
export class TokenModule {}
