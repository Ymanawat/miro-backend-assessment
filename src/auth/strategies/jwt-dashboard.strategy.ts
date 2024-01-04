import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { User } from 'src/mongodb/schemas/user.shema';
import { jwtConfig } from 'src/utils/constants';

@Injectable()
export class JwtDashboardStrategy extends PassportStrategy(
  Strategy,
  'jwtdashboard',
) {
  @InjectModel(User.name) userModel: Model<User>;
  private readonly logger = new Logger(JwtDashboardStrategy.name);

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secrets.dashboard,
      audience: jwtConfig.audience.dashboard,
    });
  }

  async validate(payload: any): Promise<any> {
    this.logger.log('JwtDashboardStrategy validate was called');
    const user = await this.userModel.findOne({ _id: payload._id });

    if (!user) {
      throw new UnauthorizedException({
        detail: 'User not found.',
        message: 'User not found.',
      });
    }

    return payload;
  }
}
