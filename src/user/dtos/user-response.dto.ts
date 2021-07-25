import { IUser } from '../interfaces';
import { IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements Omit<IUser, 'password'> {
  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  @IsDate()
  created_at: Date;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  login: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}