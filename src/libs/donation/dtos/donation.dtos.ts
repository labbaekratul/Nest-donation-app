/* eslint-disable prettier/prettier */
import { WhereToDonate, Status } from '@prisma/client';
import {} from '@nestjs/common';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  MaxLength,
  IsEnum,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';

export class DonationDto {
  @IsInt()
  @IsNotEmpty()
  @Min(50, { message: 'Minimum Donatiion Amount 50 taka' })
  donationAmount: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(WhereToDonate)
  donatedTo: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  userId;
}

export class DonationUpdateByAdminDto {
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Min(50, { message: 'Minimum Donatiion Amount 50 taka' })
  donationAmount: number;

  @IsOptional()
  @IsEnum(WhereToDonate)
  donatedTo: string;

  @IsOptional()
  @IsEnum(Status)
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class DonationUpdateByUserDto {
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Min(50, { message: 'Minimum Donatiion Amount 50 taka' })
  donationAmount: number;

  @IsOptional()
  @IsEnum(WhereToDonate)
  donatedTo: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description: string;
}

export class DonationSoftDeleteByUserDto {
  @IsOptional()
  @IsEnum(Status)
  status: string;
}
