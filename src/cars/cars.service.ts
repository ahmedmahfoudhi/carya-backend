import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car, CarDocument } from './entities/car.entity';
import { Model } from 'mongoose';


@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument> ){}


  async create(createCarDto: CreateCarDto):Promise<Car> {
    const createdCar=await this.carModel.create(createCarDto);
    const result = await createdCar.save();
    return result;
  }

  async findAll():Promise<Car[]> {
    return await this.carModel.find();
  }

  async findOne(id: string):Promise<Car> {
    const result=await this.carModel.findOne({_id:id});
    if(result){
        return result;
    }
    throw new NotFoundException(`Car with id ${id} does not exist`);
  }

  async update(id: string, updateCarDto: UpdateCarDto):Promise<Car> {
    const updateCar=await this.carModel.findByIdAndUpdate(
      id,
      updateCarDto,
      {new:true}
    );
    if (updateCar){
       return updateCar;
    }
    throw new NotFoundException(`Car with id ${id} does not exist`);
  }

  async remove(id: string) :Promise<any> {
    const deletedCar = await this.carModel.findByIdAndRemove(id);
    if (!deletedCar) {
      throw new NotFoundException('Car to delete not found');
    }
    return deletedCar;
  }

  
}
