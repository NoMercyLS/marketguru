import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    required: true,
  })
  oldPassword: string;
  
  @ApiProperty({
    required: true,
  })
  newPassword: string;
}