import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { FindUsersDto } from './dtos/find-users.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(){
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getOneUser(@Param('id',ParseIntPipe) id:number){
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto:UpdateUserDto){
    return await this.userService.updateUser(id,updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id',ParseIntPipe) id:number){
    return await this.userService.softDelete(id);
  }
}