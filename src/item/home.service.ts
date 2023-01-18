import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { Home, HomeDocument } from './schemas/home.entity';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class HomeService {
  constructor(@InjectModel(Home.name) private HomeModel: Model<HomeDocument>) {}

  async create(
    userId: string,
    createHomeDto: CreateHomeDto,
  ): Promise<HomeDocument> {
    const createdHome = await this.HomeModel.create(createHomeDto);
    const result = await createdHome.save();
    return result;
  }

  async findAll(): Promise<HomeDocument[]> {
    return await this.HomeModel.find();
  }

  async getHomeById(id: string): Promise<HomeDocument> {
    try {
      const result = await this.HomeModel.findOne({ _id: id });
      if (result) {
        return result;
      }
      throw new NotFoundException(`Home with id ${id} does not exist`);
    } catch (error) {
      throw new BadRequestException('Invalid ID');
    }
  }

  async update(
    id: string,
    updateHomeDto: UpdateHomeDto,
  ): Promise<HomeDocument> {
    const updateHome = await this.HomeModel.findByIdAndUpdate(
      id,
      updateHomeDto,
      { new: true },
    );
    if (updateHome) {
      return updateHome;
    }
    throw new NotFoundException(`Home with id ${id} does not exist`);
  }

  async remove(id: string): Promise<any> {
    const deletedHome = await this.HomeModel.findByIdAndRemove(id);
    if (!deletedHome) {
      throw new NotFoundException('Home to delete not found');
    }
    return deletedHome;
  }
}
