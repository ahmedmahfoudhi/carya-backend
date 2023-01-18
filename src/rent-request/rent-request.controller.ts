import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RentRequestService } from './rent-request.service';
import { CreateRentRequestDto } from './dto/create-rent-request.dto';
import { UpdateRentRequestDto } from './dto/update-rent-request.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRolesEnum } from 'src/user/enums/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDocument } from 'src/user/schemas/user.schema';
import { getUserId } from 'src/shared/shared';
import { RentRequestDocument } from './schemas/rent-request.entity';

@Controller('rent-request')
export class RentRequestController {
  constructor(private readonly rentRequestService: RentRequestService) {}

  @Post()
  create(@Body() createRentRequestDto: CreateRentRequestDto) {
    return this.rentRequestService.create(createRentRequestDto);
  }

  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('rent-requests')
  async getUserRentRequests(
    @GetUser() user: UserDocument,
    @Query('userId') userId: string,
  ): Promise<RentRequestDocument[]> {
    const id = getUserId(user.role, user._id.toString(), userId);
    return await this.rentRequestService.getUserRentRequests(id);
  }
}
