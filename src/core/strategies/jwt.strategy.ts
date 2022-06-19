import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Services
import { AuthService } from 'src/modules/auth/auth.service';

// Interfaces
import { TokenPayloadInterface } from 'src/core/interfaces/tokenPayload.interface';

// DTOs
import { UserOutputDto } from 'src/dtos/user/userOutputDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }
  
  async validate(payload: TokenPayloadInterface): Promise<UserOutputDto> {
    return this.authService.validateUser(payload.user.uuid);
  }
}
