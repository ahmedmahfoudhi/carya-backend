import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemService } from 'src/item/item.service';
import { UserService } from 'src/user/user.service';
import { CreateRentRequestDto } from './dto/create-rent-request.dto';
import { UpdateRentRequestDto } from './dto/update-rent-request.dto';
import {
  RentRequest,
  RentRequestDocument,
} from './schemas/rent-request.entity';

@Injectable()
export class RentRequestService {
  constructor(
    @InjectModel(RentRequest.name)
    private rentRequestModel: Model<RentRequestDocument>,
    private userService: UserService,
    private itemService: ItemService,
  ) {}

  async create(createRentRequestDto: CreateRentRequestDto) {
    const { userId, itemId } = createRentRequestDto;
    try {
      Promise.all([
        await this.userService.findUserById(userId),
        await this.itemService.findItemById(itemId),
      ]);
      const createdRentRequest = await this.rentRequestModel.create({
        ...createRentRequestDto,
      });
      const result = await createdRentRequest.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserRentRequests(userId: string): Promise<RentRequestDocument[]> {
    const rentRequests = await this.rentRequestModel.find(
      { user: userId },
      {},
      { populate: ['user', 'item'] },
    );
    return rentRequests;
  }
}
