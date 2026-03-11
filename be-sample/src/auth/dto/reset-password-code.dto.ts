import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class ResetPasswordCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  resetCode: string;

  @IsString()
  @MinLength(6)
  newPassword: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
