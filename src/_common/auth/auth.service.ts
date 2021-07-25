import {
  BadRequestException,
  CACHE_MANAGER,
  CacheStore,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS_REPOSITORY } from '../helpers';
import { AuthResponseDto, ChangePasswordDto, LoginDto } from './dtos';
import { User } from '../../user/entities';
import { CreateUserDto } from '../../user/dtos';
import { isNil } from 'lodash';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: CacheStore,
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof User,
    private jwtService: JwtService,
  ) {
  }

  public static validateLoginData(loginDto: LoginDto): LoginDto {
    if (isNil(loginDto)) {
      throw new BadRequestException({ message: 'Укажите верификационные данные: логин/email, пароль' });
    }
    if (isNil(loginDto.email) && isNil(loginDto.login)) {
      throw new BadRequestException({ message: 'Укажите email или логин для авторизации' });
    }
    if (isNil(loginDto.password)) {
      throw new BadRequestException({ message: 'Укажите пароль для авторизации' });
    }
    if (isNil(loginDto.email)) {
      return { login: loginDto.login, password: loginDto.password };
    }
    if (!isEmail(loginDto.email)) {
      throw new BadRequestException({ message: 'Email должен быть вида user@mail.ru' });
    }
    return { email: loginDto.email, password: loginDto.password };
  }

  public async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    AuthService.validateLoginData(loginDto);
    let userInstance: User;
    if (loginDto.email) {
      userInstance = await this.userRepository.findOne({ where: { email: loginDto.email } });
    } else {
      userInstance = await this.userRepository.findOne({ where: { login: loginDto.login } });
    }
    if (!userInstance) {
      throw new NotFoundException({ message: 'Пользователь с таким логином или email не найден' });
    }
    if (!await bcrypt.compare(loginDto.password, userInstance.password)) {
      throw new UnauthorizedException({ message: 'Пароль неверный' });
    }
    return this.getTokens(userInstance.id);
  }

  public async register(registerDto: CreateUserDto): Promise<AuthResponseDto> {
    AuthService.validateLoginData({
      login: registerDto.login,
      email: registerDto.email,
      password: registerDto.password,
    });
    registerDto.birthdate = moment(registerDto.birthdate, 'DD-MM-YYYY').toISOString();
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    const userInstance = await this.userRepository.create(registerDto);
    return this.getTokens(userInstance.id);
  }

  public async changePassword(userInstance: User, passwordsDto: ChangePasswordDto): Promise<AuthResponseDto> {
    if (!(await bcrypt.compare(passwordsDto.oldPassword, userInstance.password))) {
      throw new BadRequestException({ message: 'Пароли не совпадают' });
    }
    await userInstance.set({ password: await bcrypt.hash(passwordsDto.newPassword, 10) }).save();
    return this.getTokens(userInstance.id);
  }

  public async getTokens(id: string): Promise<AuthResponseDto> {
    return {
      accessToken: this.jwtService.sign({ id: id }, { secret: process.env.JWT_SECRET, expiresIn: '30m' }),
      refreshToken: this.jwtService.sign({ id: id }, { secret: process.env.JWT_SECRET, expiresIn: '60d' }),
    };
  }

  public async logout(user: User, token: string) {
    const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET, ignoreExpiration: false });
    const timeRemaining = Math.floor((decoded.exp * 1000 - Date.now()) / 1000 ) + 5
    await this.cacheManager.set(token, 'blacklisted', { ttl: timeRemaining});
  }

  public async checkBlackList(token: string): Promise<void> {
    if (await this.cacheManager.get(token.split(' ')[1])) {
      throw new UnauthorizedException();
    }
  }
}