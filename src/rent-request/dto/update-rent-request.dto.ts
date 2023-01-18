import { PartialType } from '@nestjs/mapped-types';
import { CreateRentRequestDto } from './create-rent-request.dto';

export class UpdateRentRequestDto extends PartialType(CreateRentRequestDto) {}
