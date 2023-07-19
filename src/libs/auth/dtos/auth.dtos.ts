/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  Length,
} from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?:\d{2}([-.])\d{3}\1\d{3}\1\d{3}|\d{11})$/, {
    message: 'phone must be a valid phone numer',
  })
  phone: string;

  @IsString({ message: 'Password must be a string.' })
  @Length(8, 20, {
    message: 'Password length must be between 8 and 20 characters.',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.',
  })
  password: string;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
