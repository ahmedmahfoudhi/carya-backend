import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateHomeDto {
  @IsNotEmpty()
  rooms: number;

  @IsNotEmpty()
  price: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  images: string[];

  @IsOptional()
  furnitured: string;

  @IsOptional()
  category: string;
}
