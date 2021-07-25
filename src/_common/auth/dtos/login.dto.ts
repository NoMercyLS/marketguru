import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: false
  })
  login?: string;
  @ApiProperty({
    required: false
  })
  email?: string;

  @ApiProperty({
    required: true
  })
  password: string;
}