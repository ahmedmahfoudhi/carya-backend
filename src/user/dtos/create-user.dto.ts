import { IsEmail, IsEnum, IsNotEmpty, IsNumberString, IsOptional, Length, MinLength } from "class-validator";
import { RolesEnum } from "./../enums/user-roles.enum";

export class CreateUserDto{
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @MinLength(5)
    password: string;

    @IsNotEmpty()
    @Length(8,8)
    @IsNumberString()
    cin: string;

    @IsNumberString()
    @Length(8,8)
    phoneNumber: string;

    @IsEnum(RolesEnum)
    @IsOptional()
    role: RolesEnum;
}