import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';

@Module({
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
