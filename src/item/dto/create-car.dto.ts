import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateCarDto {
  @IsNotEmpty()
  modele: string;

  @IsNotEmpty()
  marque: string;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  images: string[];

  @IsOptional()
  mileage: number;

  @IsOptional()
  seats: number;

  @IsOptional()
  fuel: string;

  @IsOptional()
  transmision: string;
}
