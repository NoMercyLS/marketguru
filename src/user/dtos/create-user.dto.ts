import { IUser } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Omit<IUser, 'id' | 'created_at' | 'updated_at'> {
  @ApiProperty({ required: false, example: '01.01.1999' })
  birthdate?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  login?: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  surname: string;
}