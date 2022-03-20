import { IsInstance, IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';

export class UserCreateOutputDto {
  @ApiProperty()
  @IsJWT()
  @IsNotEmpty()
  token: string;
  
  @ApiProperty({
    type: UserOutputDto
  })
  @IsInstance(UserOutputDto)
  @IsNotEmpty()
  user: UserOutputDto;
}