import { LoginInputDto, LoginOutputDto } from '../dtos/login.dto';
import { Response } from 'express';

export interface AuthInterface {
  readonly login: (
    loginInputDto: LoginInputDto,
    response: Response,
  ) => Promise<LoginOutputDto>;
}
