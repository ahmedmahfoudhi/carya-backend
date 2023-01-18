import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarDocument } from 'src/item/schemas/car.entity';
import { HomeDocument } from 'src/item/schemas/home.entity';
import { ItemDocument } from 'src/item/schemas/item.entity';
import { RentRequestDocument } from 'src/rent-request/schemas/rent-request.entity';
import { hashPassword } from 'src/shared/handle-password';
import { GenericResponse } from 'src/shared/interfaces/response';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUserById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException('User does not exist');
      }
      return user;
    } catch (error) {
      throw new BadRequestException('Invalid id');
    }
  }

  async createUser(createUserDto): Promise<UserDocument> {
    const user = await this.findUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = await this.userModel.create(createUserDto);
    const savedUser = await createdUser.save();
    return savedUser;
  }

  async findUserByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    if (updateUserDto.email) {
      const user = await this.findUserByEmail(updateUserDto.email);
      const userId = user._id.toString();
      if (userId !== id) {
        throw new BadRequestException('Email is being used');
      }
    }
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserDto },
      { new: true },
    );
    return updatedUser;
  }

  async deleteUser(id: string): Promise<GenericResponse> {
    const deleteResult = await this.userModel.findOneAndDelete({ _id: id });
    console.log(deleteResult);
    return {
      success: true,
      message: [`User with id ${id} has been deleted successfully`],
      successCode: 200,
    };
  }

  async addCarToUser(userId: string, createdCarId: string): Promise<User> {
    const user = this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { cars: createdCarId } },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async addHomeToUser(userId: string, createdHomeId: string): Promise<User> {
    const user = this.userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { homes: createdHomeId } },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async getUserCars(userId: string): Promise<CarDocument[]> {
    const user = await this.userModel.findOne(
      { _id: userId },
      { cars: 1 },
      { populate: 'cars' },
    );
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const cars = user.cars;
    return cars;
  }

  async getUserHomes(userId: string): Promise<HomeDocument[]> {
    const user = await this.userModel.findOne(
      { _id: userId },
      { homes: 1 },
      { populate: 'homes' },
    );
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const homes = user.homes;
    return homes;
  }

  async getUserItems(userId: string): Promise<ItemDocument[]> {
    const user = await this.userModel.findOne(
      {
        _id: userId,
      },
      { homes: 1, cars: 1 },
      { populate: ['homes', 'cars'] },
    );
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const cars: ItemDocument[] = user.cars;
    const homes: ItemDocument[] = user.homes;
    const result = [...cars, ...homes];
    return result;
  }
}
