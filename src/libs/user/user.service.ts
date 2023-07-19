import { Injectable } from '@nestjs/common';
import { errorHandler } from 'src/helpers/errorHanders';
import { UserUpdateParams } from 'src/interfaces/user.interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dtos/user.dtos';
import { apiMathods } from 'src/helpers/api-func';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private User = this.prismaService.user;

  // ## GET ALL USERS
  async getAllUsers(query) {
    try {
      return await apiMathods(this.User, query);
    } catch (error) {
      return errorHandler(500, true, error.message);
    }
  }

  // ## GET USER DETAIILS
  async getUserDetails(id: string) {
    const user = await this.User.findUnique({
      where: { id },
    });
    if (!user) return errorHandler(404);
    return plainToClass(UserResponseDto, user);
  }

  // ## UPPDATE USER DETAILS
  async updateUserById(id: string, updateData: UserUpdateParams) {
    try {
      const updateUser = await this.User.update({
        where: { id },
        data: updateData,
      });
      return plainToClass(UserResponseDto, updateUser);
    } catch (error) {
      if (error.code === 'P2025') return errorHandler(404);
    }
  }

  // ## DELETE USER BY ID (ADMIN ONLY)
  async deleteUserById(id: string) {
    try {
      await this.User.delete({ where: { id } });
      return { message: 'User Deleted' };
    } catch (error) {
      if (error.code === 'P2025') return errorHandler(404);
      return errorHandler(500);
    }
  }
}
