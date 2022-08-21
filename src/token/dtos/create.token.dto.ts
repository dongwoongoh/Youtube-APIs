import { IsString } from 'class-validator';

export class CreateTokenOutputDto {
  @IsString()
  readonly accessToken: string;

  @IsString()
  readonly refreshToken: string;
}
