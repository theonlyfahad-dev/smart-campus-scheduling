import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  MinLength,
  Matches,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsBoolean()
  @IsOptional()
  isFirstLoginAttempt?: boolean;
}
