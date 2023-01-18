import { Controller, Post } from '@nestjs/common';
import {
  Body,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { IsMongoId } from 'class-validator';
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
import { GetAllItemsQueryParams } from './dto/get-all-items-query-params';
import { HomeService } from './home.service';
import { ItemService } from './item.service';
import { CarDocument } from './schemas/car.entity';
import { HomeDocument } from './schemas/home.entity';
import { ItemDocument } from './schemas/item.entity';

@Controller('item')
export class ItemController {
  constructor(
    private carService: CarService,
    private homeService: HomeService,
    private itemService: ItemService,
  ) {}

  @Get('')
  async getAllItems(
    @Query() queryParams: GetAllItemsQueryParams,
  ): Promise<ItemDocument[]> {
    return await this.itemService.getAllItems(queryParams);
  }

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

  @Get('car/:id')
  @UsePipes(IsMongoId)
  async getCarById(@Param('id') id: string): Promise<CarDocument> {
    return await this.carService.getCarById(id);
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

  @Get('home/:id')
  @UsePipes(IsMongoId)
  async getHomeById(@Param('id') id: string): Promise<HomeDocument> {
    return await this.homeService.getHomeById(id);
  }
}
