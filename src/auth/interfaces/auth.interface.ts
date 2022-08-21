import { AuthLoginInputDto, AuthLoginOutputDto } from '../dtos/auth.login.dto';

export interface AuthInterface {
  readonly login: (
    authLoginInputDto: AuthLoginInputDto,
  ) => Promise<AuthLoginOutputDto>;

  readonly reCreateTokens: (user: any) => any;
  readonly logout: (id: number) => Promise<{ logout: boolean }>;
}
