import { IsEmail, IsString, Length } from 'class-validator';

export class ActivateCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  activationCode: string;
}
