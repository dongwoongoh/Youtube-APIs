import { IsEmail, IsString } from 'class-validator';

export class LoginInputDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class LoginOutputDto {
  @IsString()
  readonly message: string;
}
