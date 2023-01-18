import { Controller, Post } from '@nestjs/common';
import { Body, Query, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/shared/decorators/get-user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { getUserId } from 'src/shared/shared';
import { UserRolesEnum } from 'src/user/enums/user-role.enum';
import { UserDocument } from 'src/user/schemas/user.schema';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { CreateHomeDto } from './dto/create-home.dto';
import { HomeService } from './home.service';
import { ItemService } from './item.service';
import { CarDocument } from './schemas/car.entity';
import { HomeDocument } from './schemas/home.entity';

@Controller('item')
export class ItemController {
  constructor(
    private carService: CarService,
    private homeService: HomeService,
    private itemService: ItemService,
  ) {}

  @Post('car')
  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createCar(
    @GetUser() user: UserDocument,
    @Body() createCarDto: CreateCarDto,
    @Query('id') userId: string,
  ): Promise<CarDocument> {
    const id = getUserId(user.role, user._id.toString(), userId);
    return await this.itemService.createCar(id, createCarDto);
  }

  @Post('home')
  @Roles(UserRolesEnum.USER, UserRolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createHome(
    @GetUser() user: UserDocument,
    @Body() createHomeDto: CreateHomeDto,
    @Query('id') userId: string,
  ): Promise<HomeDocument> {
    console.log(user);
    const id = getUserId(user.role, user._id.toString(), userId);
    return await this.itemService.createHome(id, createHomeDto);
  }
}
