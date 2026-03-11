import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RefreshDto {
  @IsOptional()
  @IsString()
  @Transform(({ value, obj }) => {
    if (typeof value === 'string') {
      return value;
    }

    if (obj && typeof obj === 'object') {
      const payload = obj as Record<string, unknown>;
      const snake = payload['refresh_token'];
      if (typeof snake === 'string') {
        return snake;
      }

      const camel = payload['refreshToken'];
      if (typeof camel === 'string') {
        return camel;
      }
    }

    return undefined;
  })
  refreshToken: string;
}
