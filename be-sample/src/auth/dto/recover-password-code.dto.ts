import { IsEmail } from 'class-validator';

export class RecoverPasswordCodeDto {
  @IsEmail()
  email: string;
}
