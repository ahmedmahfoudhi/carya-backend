import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './schemas/car.entity';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async create(
    userId: string,
    createCarDto: CreateCarDto,
  ): Promise<CarDocument> {
    const createdCar = await this.carModel.create({
      ...createCarDto,
      user: userId,
    });
    const result = await createdCar.save();
    return result;
  }

  async findAll(): Promise<CarDocument[]> {
    return await this.carModel.find();
  }

  async getCarById(id: string): Promise<CarDocument> {
    try {
      const result = await this.carModel.findOne({ _id: id });
      if (result) {
        return result;
      }
      throw new NotFoundException(`Car with id ${id} does not exist`);
    } catch (error) {
      throw new BadRequestException('Invalid ID');
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<CarDocument> {
    const updateCar = await this.carModel.findByIdAndUpdate(id, updateCarDto, {
      new: true,
    });
    if (updateCar) {
      return updateCar;
    }
    throw new NotFoundException(`Car with id ${id} does not exist`);
  }

  async remove(id: string): Promise<any> {
    const deletedCar = await this.carModel.findByIdAndRemove(id);
    if (!deletedCar) {
      throw new NotFoundException('Car to delete not found');
    }
    return deletedCar;
  }
}
