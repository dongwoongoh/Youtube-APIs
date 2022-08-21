import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthInterface } from './interfaces/auth.interface';
import { AuthLoginInputDto, AuthLoginOutputDto } from './dtos/auth.login.dto';
import { JwtAccessGuard } from '../token/guards/jwt.access.guard';
import { User } from '../common/decorators/user.decorator';
import { JwtRefreshGuard } from '../token/guards/jwt.refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthInterface,
  ) {}

  @Post('login')
  private async login(
    @Body() authLoginInputDto: AuthLoginInputDto,
  ): Promise<AuthLoginOutputDto> {
    return await this.authService.login(authLoginInputDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get('access')
  private me(@User() user) {
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  private async reCreateTokens(@User() user) {
    return await this.authService.reCreateTokens(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  private async logout(@User() user) {
    return await this.authService.logout(user['id']);
  }
}
