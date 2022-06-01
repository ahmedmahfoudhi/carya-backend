import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy.strategy';

@Module({
  imports: [UserModule,PassportModule.register({
    defaultStrategy: 'jwt',
  }), JwtModule.register({
    secret: process.env.SECRET_KEY || 'secret_key',
    signOptions: {
      expiresIn: `${process.env.SECRET_KEY_EXPIRATION_TIME || 3600*24} s`,
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
