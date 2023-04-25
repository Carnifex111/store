import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Пароль должен быть не короче 6 символов',
  })
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
