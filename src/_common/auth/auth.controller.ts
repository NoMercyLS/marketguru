import { Body, Controller, Headers, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, ChangePasswordDto, LoginDto } from './dtos';
import { CreateUserDto } from '../../user/dtos';
import { User } from '../../user/entities';
import { JwtAuthGuard } from './guards';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('/login')
  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  public async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @ApiCreatedResponse({
    type: AuthResponseDto,
  })
  public async register(@Body() registerDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/change-password')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  public async changePassword(
    @Headers('Authorization') token: any,
    @Request() req: any,
    @Body() passwordsDto: ChangePasswordDto,
  ): Promise<AuthResponseDto> {
    await this.authService.checkBlackList(token);
    return this.authService.changePassword(req.user as User, passwordsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/logout')
  @ApiBearerAuth()
  @ApiOkResponse({
    type: AuthResponseDto,
  })
  public async logout(
    @Headers('Authorization') token: any,
    @Request() req: any): Promise<void> {
    const token_jwt = token.split(' ')[1];
    await this.authService.checkBlackList(token_jwt);
    return this.authService.logout(req.user as User, token_jwt);
  }
}