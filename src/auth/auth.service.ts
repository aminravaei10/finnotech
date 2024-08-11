import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.email, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: RegisterDto): Promise<{ access_token: string }> {
    const hashedPassword = user.password;
    await this.usersService.addUser({
      email: user.email,
      name: user.name,
      password: hashedPassword,
      username: user.username,
    });
    return this.signIn(user.username, user.password);
  }
}
