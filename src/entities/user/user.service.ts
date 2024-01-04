import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas/user.shema';
import { jwtConfig } from 'src/utils/constants';
import { passwordHash, comparePassword } from 'src/utils/util';
import {
  NewUserDto,
  SuccessResponseDto,
  LoginPayload,
  LoginResponseDto,
} from './user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  @InjectModel(User.name) userModel: Model<User>;
  constructor(private readonly jwtService: JwtService) {}

  public async signUp(newUserData: NewUserDto): Promise<SuccessResponseDto> {
    const { firstName, lastName, password } = newUserData;
    const email = newUserData.email.toLowerCase();

    const existingUser = await this.userModel.findOne({
      email: email,
    });

    console.log(existingUser);
    if (existingUser) {
      throw new ForbiddenException(['Account with this email already exists.']);
    }

    const hashedKey = await passwordHash(password);

    try {
      await this.userModel.create({
        firstName,
        lastName,
        password: hashedKey,
        email,
      });

      return {
        success: true,
        message: 'Signup success, Login with your crendentials',
      };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: 'Signup failed' };
    }
  }

  public async getUser(userId: string): Promise<User> {
    const resUsers = await this.userModel.findOne({ _id: userId });
    return resUsers;
  }

  public async login(userData: LoginPayload): Promise<LoginResponseDto> {
    const password = userData.password;
    let email = userData.email.toLowerCase();

    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      this.logger.error('Login failed, Incorrect email');
      throw new ForbiddenException(['Account with this email not found']);
    }

    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      this.logger.error('Login failed, Incorrect  password');
      throw new ForbiddenException([
        'Incorrect password. Please check your password again',
      ]);
    }

    const payload = {
      _id: user._id,
      context: jwtConfig.audience.dashboard,
    };
    const token = this.jwtService.sign(payload, {
      audience: jwtConfig.audience.dashboard,
      expiresIn: jwtConfig.ttl.oneMonth,
      secret: jwtConfig.secrets.dashboard,
    });

    this.logger.log('Login success');
    return {
      success: true,
      message: 'Login success',
      bearer_token: token,
    };
  }
}
