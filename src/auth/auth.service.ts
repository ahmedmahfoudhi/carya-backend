import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dtos/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from 'src/user/enums/user-roles.enum';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

    async register(createUserDto: CreateUserDto): Promise<any>{

        // get user password
        const password = createUserDto.password;

        //generate salt
        const salt = await bcrypt.genSalt(10);

        // hash password 
        const hashedPassword = await bcrypt.hash(password,salt);

        // use the hashed password as the new password
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

        await this.verifyPassword(password,user.password);

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
          await this.verifyPassword(plainTextPassword, user.password);
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
       
      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
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