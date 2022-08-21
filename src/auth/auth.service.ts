import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthLoginInputDto, AuthLoginOutputDto } from './dtos/auth.login.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async login({
    email,
    password,
  }: AuthLoginInputDto): Promise<AuthLoginOutputDto> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('email');
    if (user.password !== password) throw new BadRequestException('password');
    const { id, phone } = user;
    try {
      const { accessToken, refreshToken } =
        await this.tokenService.createTokens(
          { id, email },
          { id, email, phone },
        );
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
