import { IsInstance, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';

export class TokenPayloadInterface {
  @ApiProperty()
  @IsNotEmpty()
  @IsInstance(UserOutputDto)
  user: UserOutputDto;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  iat: number;
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  exp: number
}