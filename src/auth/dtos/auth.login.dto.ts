import { IsEmail, IsString } from 'class-validator';
import { CreateTokenOutputDto } from '../../token/dtos/create.token.dto';

export class AuthLoginInputDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class AuthLoginOutputDto extends CreateTokenOutputDto {}
