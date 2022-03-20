import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';

// Swagger
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// DTOs
import { UserCreateOutputDto } from 'src/dtos/user/userCreateOutputDto';
import { UserCreateInputDto } from 'src/dtos/user/userCreateInputDto';


@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  
  constructor(private readonly authService: AuthService) {
  }
  
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiCreatedResponse({
    type: UserCreateOutputDto
  })
  @Post('register')
  async register(@Body() user: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.register(user);
  }
  
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  @ApiResponse({
    status: 200,
    type: UserCreateOutputDto
  })
  @Post('login')
  async login(@Body() user: UserCreateInputDto): Promise<UserCreateOutputDto> {
    return await this.authService.login(user);
  }
}
