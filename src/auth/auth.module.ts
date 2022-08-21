import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    PrismaService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
