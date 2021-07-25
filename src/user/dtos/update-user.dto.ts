import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    required: false
  })
  birthdate?: string;

  @ApiProperty({
    required: false
  })
  name?: string;

  @ApiProperty({
    required: false
  })
  surname?: string;

  @ApiProperty({
    required: false
  })
  email?: string;

  @ApiProperty({
    required: false
  })
  login?: string;

  @ApiProperty({
    required: true,
    description: 'ID пользователя для обновления данных'
  })
  id: string;
}