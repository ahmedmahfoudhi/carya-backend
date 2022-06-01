import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class FindUsersDto{

    @IsOptional()
    @IsIn(['id','firstName','lastName'])
    criteria: string;

    @IsOptional()
    @IsIn(['ASC','DESC'])
    orderType: string;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    page: number;

    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    nbPerPage: number;
}