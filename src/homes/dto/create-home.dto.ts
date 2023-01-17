import {
    IsNotEmpty, IsOptional,
  } from 'class-validator';
export class CreateHomeDto {
    @IsNotEmpty()
    Rooms: number;

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    City: string

    @IsNotEmpty()
    Description: string

    @IsOptional()
    Images: string[]

    @IsOptional()
    Furnitured: string

    @IsOptional()
    Category: string
}
