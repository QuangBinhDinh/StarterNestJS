import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.findUser(username);
    if (user?.password == pass) {
      //Exclude password for security
      const { password, ...data } = user;
      const access_token = await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      });
      //console.log('Access token: ', access_token);
      return { ...data, access_token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
