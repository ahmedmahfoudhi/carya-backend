import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import User from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto:LoginUserDto){
    return this.authService.login(loginUserDto);
  } 
}