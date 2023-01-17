import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
