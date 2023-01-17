import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-Home.dto';
import { Home, HomeDocument } from './entities/Home.entity';
import { Model } from 'mongoose';


@Injectable()
export class HomesService {
  constructor(@InjectModel(Home.name) private HomeModel: Model<HomeDocument> ){}


  async create(createHomeDto: CreateHomeDto):Promise<Home> {
    const createdHome=await this.HomeModel.create(createHomeDto);
    const result = await createdHome.save();
    return result;
  }

  async findAll():Promise<Home[]> {
    return await this.HomeModel.find();
  }

  async findOne(id: string):Promise<Home> {
    const result=await this.HomeModel.findOne({_id:id});
    if(result){
        return result;
    }
    throw new NotFoundException(`Home with id ${id} does not exist`);
  }

  async update(id: string, updateHomeDto: UpdateHomeDto):Promise<Home> {
    const updateHome=await this.HomeModel.findByIdAndUpdate(
      id,
      updateHomeDto,
      {new:true}
    );
    if (updateHome){
       return updateHome;
    }
    throw new NotFoundException(`Home with id ${id} does not exist`);
  }

  async remove(id: string) :Promise<any> {
    const deletedHome = await this.HomeModel.findByIdAndRemove(id);
    if (!deletedHome) {
      throw new NotFoundException('Home to delete not found');
    }
    return deletedHome;
  }

  
}
