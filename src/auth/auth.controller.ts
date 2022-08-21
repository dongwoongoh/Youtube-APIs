import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { AuthInterface } from './interfaces/auth.interface';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthInterface,
  ) {}

  @Post('login')
  async login(
    @Body() loginInputDto: LoginInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutputDto> {
    return await this.authService.login(loginInputDto, response);
  }
}
