import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWT_SECRET } from 'src/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>(); //get request from ArugmentHost
    // const token = this.extractTokenFromHeader(req);
    const token = req.headers['authorization']; // do not use Bearer token for simplicity
    if (!token) {
      throw new UnauthorizedException('Credential not found');
    }
    try {
      const paylaod = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });
      req['user'] = paylaod;
      console.log('Payload: ', paylaod);
    } catch (err) {
      console.log('Error: ', err);
      throw new UnauthorizedException('Invalid credential');
    }
    return true;
  }

  // extract token from authrization header, only accept bearer token
  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
