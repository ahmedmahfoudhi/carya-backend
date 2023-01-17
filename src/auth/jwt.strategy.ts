import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/schemas/user.schema';
import { UserPayload } from './interfaces/user.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SECRET'),
    });
  }

  async validate(payload: UserPayload) {
    const user: User = await this.userService.findUserByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    user.password = undefined;
    return user;
  }
}
