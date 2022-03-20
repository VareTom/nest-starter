import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateInputDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}