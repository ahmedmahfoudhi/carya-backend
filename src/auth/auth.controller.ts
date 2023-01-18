import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './interfaces/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    return await this.authService.registerUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.loginUser(loginDto);
  }
}
