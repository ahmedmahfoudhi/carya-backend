import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { comparePasswords } from 'src/shared/handle-password';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { LoginResponse } from './interfaces/login.response';
import { UserPayload } from './interfaces/user.payload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await this.userService.createUser(createUserDto);
  }

  async loginUser(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Verify your credentials');
    }
    const comparisonResult = await comparePasswords(
      loginDto.password,
      user.password,
    );
    if (!comparisonResult) {
      throw new UnauthorizedException('Verify your credentials');
    }
    return this.signToken(user);
  }

  signToken(user: UserDocument): LoginResponse {
    const userPayload: UserPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(userPayload),
      email: user.email,
      expriresIn: this.configService.get('EXPIRATION_TIME'),
    };
  }
}
