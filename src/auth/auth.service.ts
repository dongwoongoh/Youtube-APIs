import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthLoginInputDto, AuthLoginOutputDto } from './dtos/auth.login.dto';
import { TokenService } from '../token/token.service';
import { AuthInterface } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  public async login({
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
      await this.prisma.user.update({
        where: { email },
        data: { refreshToken },
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  public async reCreateTokens(user: any) {
    const { accessToken, refreshToken } = await this.tokenService.createTokens(
      { id: user['id'], email: user['email'] },
      { id: user['id'], email: user['email'], phone: user['phone'] },
    );
    await this.prisma.user.update({
      where: { id: user['id'] },
      data: { refreshToken },
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
