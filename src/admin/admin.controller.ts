import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){}

    @Post('user/add')
    addUser(@Body() createUserDto: CreateUserDto){
        return this.adminService.addUser(createUserDto);
    }
}
