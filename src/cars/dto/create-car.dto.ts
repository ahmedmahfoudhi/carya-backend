import {
    IsNotEmpty, IsOptional,
  } from 'class-validator';
export class CreateCarDto {
    @IsNotEmpty()
    Modele: string;

    @IsNotEmpty()
    Marque: string

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    City: string

    @IsNotEmpty()
    Description: string

    @IsOptional()
    Images: string[]

    @IsOptional()
    Mileage: number

    @IsOptional()
    Seats: number

    @IsOptional()
    Fuel: string

    @IsOptional()
    Transmision: string
}
