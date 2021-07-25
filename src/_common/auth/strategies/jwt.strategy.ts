import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isNil } from 'lodash';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../../user/entities';
import { USERS_REPOSITORY } from '../../helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    if (isNil(payload) || isNil(payload.id)) {
      throw new UnauthorizedException;
    }
    const userInstance: User = await this.userRepository.findByPk(payload.id);
    if (isNil(userInstance)) {
      throw new NotFoundException;
    }
    return userInstance;
  }
}