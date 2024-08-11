import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/createUser.dto';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async addUser(user: RegisterDto) {
    const hashedPassword = user.password;
    const createdUser = await this.userModel.create({
      email: user.email,
      name: user.name,
      password: hashedPassword,
      username: user.username,
    });
    await createdUser.save();
  }
}
