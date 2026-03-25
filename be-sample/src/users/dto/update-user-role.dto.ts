import { Transform } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserRoleDto {
  @Transform(({ value }: { value: string }) => value?.trim().toUpperCase())
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  roleName: string;
}
