import { IsInstance, IsNotEmpty, IsNumber } from 'class-validator';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';

export class TokenPayloadInterface {
  @IsNotEmpty()
  @IsInstance(UserOutputDto)
  user: UserOutputDto;
  
  @IsNumber()
  @IsNotEmpty()
  iat: number;
  
  @IsNumber()
  @IsNotEmpty()
  exp: number
}
