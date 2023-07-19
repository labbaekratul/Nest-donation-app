/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^(?:\d{2}([-.])\d{3}\1\d{3}\1\d{3}|\d{11})$/, {
    message: 'phone must be a valid phone numer',
  })
  phone?: string;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  role: string;
  createdA: Date;
  updatedAt: Date;
  Donation: [];
}
