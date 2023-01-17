import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GenericResponse } from 'src/shared/interfaces/response';
import { getUserId } from 'src/shared/shared';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRolesEnum } from './enums/user-role.enum';
import { User, UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('')
  async updateUser(
    @GetUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
    @Query('userId') userId: string,
  ): Promise<UserDocument> {
    const id = getUserId(user.role, user._id.toString(), userId);
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('')
  async deleteUser(
    @GetUser() user: UserDocument,
    @Query('userId') userId: string,
  ): Promise<GenericResponse> {
    const id = getUserId(user.role, user._id.toString(), userId);
    return await this.userService.deleteUser(id);
  }
  // @Roles(UserRolesEnum.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Get('')
  // getMe(@GetUser() user: UserDocument) {
  //   return user;
  // }
}
