import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateOfferDto{

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    user: number;

    @IsOptional()
    carImages: string;

    @IsNotEmpty()
    carDescription: string;

    @IsNotEmpty()
    carType:string;

    @IsNotEmpty()
    @Type(()=>Number)
    @IsNumber()
    price: number;
}