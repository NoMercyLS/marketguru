import { ApiProperty } from '@nestjs/swagger';

export class UserPaginationOptions {
  @ApiProperty({
    description: 'Поля для поиска: id, name, login, email, surname, birthdate',
    required: false,
  })
  filters?: any;

  @ApiProperty(
    {
      example: 0,
      required: false,
    },
  )
  page?: number;

  @ApiProperty(
    {
      example: 0,
      required: false,
    },
  )
  limit?: number;
}