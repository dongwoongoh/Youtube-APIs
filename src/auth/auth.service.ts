import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TokenService } from '../token/token.service';
import { AuthInterface } from './interfaces/auth.interface';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login(
    { email, password }: LoginInputDto,
    response: Response,
  ): Promise<LoginOutputDto> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('email');
    if (user.password !== password) throw new BadRequestException('password');
    const { accessToken, refreshToken } = await this.tokenService.createTokens(
      { id: user.id, email },
      { id: user.id, email, phone: user.phone },
    );
    response.cookie('access_token', accessToken, { httpOnly: true });
    response.cookie('refresh_token', refreshToken, { httpOnly: true });
    return {
      message: 'ok',
    };
  }
}
