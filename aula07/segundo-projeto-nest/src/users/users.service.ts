import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  async findAll() {
    const allUsers = await this.userModel.find();
    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      return null;
    }
    const userUpdated = await this.userModel.updateOne(
      { _id: id },
      updateUserDto,
    );
    if (userUpdated.matchedCount != 0) {
      const userUpdatedData = await this.userModel.findOne({ _id: id });
      return userUpdatedData;
    }
    return userUpdated;
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      return null;
    }
    const userRemoved = await this.userModel.deleteOne({ _id: id });
    return userRemoved;
  }
}
