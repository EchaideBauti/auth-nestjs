import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,private authServiceJwt : JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.authServiceJwt.signAsync(payload),
    };
  }
}
