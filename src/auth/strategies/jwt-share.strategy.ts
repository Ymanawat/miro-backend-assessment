import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from 'src/utils/constants';

@Injectable()
export class JwtShareStrategy extends PassportStrategy(Strategy, 'jwtshare') {
  private readonly logger = new Logger(JwtShareStrategy.name);
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secrets.share,
      audience: jwtConfig.audience.share,
    });
  }

  async validate(payload) {
    this.logger.log('JwtShareStrategy validate was called');
    return payload;
  }
}
