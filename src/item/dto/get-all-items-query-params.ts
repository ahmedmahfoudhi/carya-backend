import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetAllItemsQueryParams {
  @IsOptional()
  category: string;

  @IsOptional()
  @Type(() => Number)
  minPrice: number;

  @IsOptional()
  @Type(() => Number)
  maxPrice: number;

  @IsOptional()
  governorate: string;
}
