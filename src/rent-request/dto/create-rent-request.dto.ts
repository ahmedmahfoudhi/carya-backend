import { IsMongoId, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateRentRequestDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  itemId: string;

  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  phoneNumber: string;

  message: string;
}
