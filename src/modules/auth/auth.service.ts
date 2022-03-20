import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

// Services
import { JwtService } from '@nestjs/jwt';

// Entities
import { User } from 'src/core/entities/user.entity';

// Constants
import { USER_REPOSITORY } from 'src/core/constants';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';
import { UserCreateOutputDto } from 'src/dtos/user/userCreateOutputDto';
import { UserCreateInputDto } from 'src/dtos/user/userCreateInputDto';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY)
              private userRepository: typeof User,
              private readonly jwt: JwtService) {}
  
  async validateUser(uuid: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        uuid: uuid
      }
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return new UserOutputDto(user);
  }
  
  async login(userCreateInput: UserCreateInputDto): Promise<UserCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: userCreateInput.email
      }
    });
    if (!user) throw new HttpException('User not found or not confirmed', HttpStatus.BAD_REQUEST);

    const isValid = await bcrypt.compare(userCreateInput.password, user.password);
    if (!isValid) throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);

    const formattedUser = new UserOutputDto(user);
    const jwt = this.jwt.sign({user: formattedUser});
    if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);

    return {
      token: jwt,
      user: formattedUser
    };
  }
  
  async register(registerInput: UserCreateInputDto): Promise<UserCreateOutputDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: registerInput.email.toLowerCase()
      }
    })
    if (!user) throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
  
    user.password = await bcrypt.hash(registerInput.password, 10);
    await user.save();
    
    const jwt = this.jwt.sign({user: user});
    if (!jwt) throw new HttpException('Token creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    
    return {token: jwt, user: new UserOutputDto(user)};
  }
}
