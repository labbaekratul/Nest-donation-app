import {
  Controller,
  Get,
  Put,
  Delete,
  UseGuards,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dtos/user.dtos';
import { AuthGuard, AdminGuard } from 'src/utils/auth.guards';

@Controller('api/user')
@UseGuards(AuthGuard, AdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query: string) {
    return this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserDetails(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: UserUpdateDto,
  ) {
    return this.userService.updateUserById(id, updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUserById(id);
  }
}
