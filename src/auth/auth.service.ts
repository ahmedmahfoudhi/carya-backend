import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';

import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from 'src/user/enums/user-roles.enum';
import { LoginUserDto } from './dtos/login-user.dto';
import { comparePasswords, hashPassword } from 'src/generics/password-bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async register(createUserDto: CreateUserDto): Promise<any>{

        const plainTextPassword = createUserDto.password;
        const hashedPassword = await hashPassword(plainTextPassword);
        createUserDto.password = hashedPassword;

        // call the method responsible for adding the user in the db and return the result
        const newUser =  await this.userService.addUser(createUserDto);

        const access_token = this.generateToken(newUser.email,newUser.role,newUser.password);
        newUser.password = undefined;
        return {
          user:newUser,
          access_token
        }
    }


    async login(loginUserDto: LoginUserDto){
        const {email,password}  = loginUserDto;
        const user = await this.userService.getUserByEmail(email);
        if(!user){
            throw new UnauthorizedException(`Wrong credentials`);
        }

        const passwordComparaison = await comparePasswords(password,user.password);
        if(!passwordComparaison){
          throw new UnauthorizedException('Wrong credentials');
        }

        const access_token = this.generateToken(user.email,user.role,user.password);
        user.password = undefined;
        return {
            user,
            access_token
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.userService.getUserByEmail(email);
          if(!user){
            throw new UnauthorizedException('Wrong credentials!')
          }
          const passwordComparaison = await comparePasswords(plainTextPassword,user.password);
          if(!passwordComparaison){
            throw new UnauthorizedException('Wrong credentials');
          }
          user.password = undefined;
          const access_token = this.generateToken(user.email,user.role,user.password);
          const {password, ...result} = user;
          return {
            user:result,
            access_token
          }
        } catch (error) {
          throw new HttpException('Wrong credentials!', HttpStatus.BAD_REQUEST);
        }
      }
       



      generateToken = (email:string,role:RolesEnum,password:string) => {
        const payload : JwtPayloadDto = {
          email,
          role,
          password,
        }
        return this.jwtService.sign(payload);
      }
}