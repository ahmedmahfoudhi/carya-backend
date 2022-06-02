import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/generics/password-bcrypt';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
    constructor(private userService:UserService){}


    async addUser(createUserDto:CreateUserDto){
        createUserDto.password = await hashPassword(createUserDto.password);
        const user = await this.userService.addUser(createUserDto);
        user.password = undefined;
        return user;
    }
}
