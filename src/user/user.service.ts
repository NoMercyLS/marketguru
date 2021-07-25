import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities';
import { UserPaginationOptions } from './dtos/user-pagination.options';
import { UserResponseDto } from './dtos/user-response.dto';
import { USERS_REPOSITORY } from '../_common/helpers';
import { omit } from 'lodash';
import { UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: typeof User,
  ) {
  }

  public static parseFilters(options: UserPaginationOptions): Object {
    const filtersKeys = Object.keys(options).filter((item) => item !== 'page' && item !== 'limit');
    let filters = {};
    filtersKeys.map((field) => filters[field] = options[field]);
    return filters;
  }

  public static validateAccess(instance_user_id, request_user_id) {
    if (instance_user_id !== request_user_id) {
      throw new UnauthorizedException;
    }
  }

  public async findAll(options: UserPaginationOptions): Promise<UserResponseDto[]> {
    return (
      await this.userRepository.findAll(
        {
          offset: options?.page ? options.page * (options?.limit ? options.limit : 0) : 0,
          limit: options.limit,
          where: UserService.parseFilters(options),
        },
      )
    ).map(
      (item: User): UserResponseDto => omit(item.toJSON(), ['password']) as UserResponseDto,
    );
  }

  public async findOne(user_id: string): Promise<UserResponseDto> {
    const userInstance = await this.userRepository.findByPk(user_id);
    if (!userInstance) {
      throw new NotFoundException({ message: 'User was not found' });
    }
    return omit(userInstance.toJSON(), ['password']) as UserResponseDto;
  }

  public async delete(userInstance: User, id: string): Promise<void> {
    UserService.validateAccess(userInstance.id, id);
    await userInstance.destroy();
  }

  public async update(userInstance: User, dto: UpdateUserDto): Promise<void> {
    UserService.validateAccess(userInstance.id, dto.id);
    await userInstance.set(omit(dto, ['id'])).save();
  }
}