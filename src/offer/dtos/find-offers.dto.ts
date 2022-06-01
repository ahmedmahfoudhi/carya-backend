import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class FindOffersDto{

    @IsOptional()
    @IsIn(['ASC','DESC'])
    orderType:string;

    @IsOptional()
    @IsIn(['id','price'])
    criteria: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsInt()
    @IsPositive()
    nbPerPage: number;

    
}