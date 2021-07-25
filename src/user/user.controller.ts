import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserPaginationOptions } from './dtos/user-pagination.options';
import { UserResponseDto } from './dtos/user-response.dto';
import { UpdateUserDto } from './dtos';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../_common/auth/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities';
import { AuthService } from '../_common/auth/auth.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Get()
  public async findUsers(@Query() options: UserPaginationOptions): Promise<UserResponseDto[]> {
    return this.userService.findAll(options);
  }

  @Get(':id')
  public async findUser(@Param('id', ParseUUIDPipe) user_id: string): Promise<UserResponseDto> {
    return this.userService.findOne(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch()
  public async updateUser(
    @Headers('Authorization') token: any,
    @Request() req: any,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    await this.authService.checkBlackList(token);
    return this.userService.update(req.user as User, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  public async deleteUser(
    @Headers('Authorization') token: any,
    @Request() req: any,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.authService.checkBlackList(token);
    return this.userService.delete(req.user as User, id);
  }
}