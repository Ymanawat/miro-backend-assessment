import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './mongodb/schemas/user.shema';

@Injectable()
export class RestApiService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  getHello(): string {
    return 'Yeah, Miro!';
  }
}
