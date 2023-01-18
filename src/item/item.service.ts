import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { CreateHomeDto } from './dto/create-home.dto';
import { HomeService } from './home.service';
import { Car, CarDocument } from './schemas/car.entity';
import { Home, HomeDocument } from './schemas/home.entity';
import { Item, ItemDocument } from './schemas/item.entity';

@Injectable()
export class ItemService {
  constructor(
    private userService: UserService,
    private carService: CarService,
    private homeService: HomeService,
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
  ) {}

  async createCar(
    userId: string,
    createCarDto: CreateCarDto,
  ): Promise<CarDocument> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const createdCar = await this.carService.create(userId, createCarDto);
    await this.userService.addCarToUser(userId, createdCar._id.toString());
    return createdCar;
  }

  async createHome(
    userId: string,
    createHomeDto: CreateHomeDto,
  ): Promise<HomeDocument> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const createdHome: any = await this.homeService.create(
      userId,
      createHomeDto,
    );
    await this.userService.addHomeToUser(userId, createdHome._id);
    return createdHome;
  }

  async findItemById(itemId: string): Promise<ItemDocument> {
    const item = await this.itemModel.findById({ _id: itemId });
    if (!item) {
      throw new BadRequestException('Item does not exist');
    }
    return item;
  }
}
