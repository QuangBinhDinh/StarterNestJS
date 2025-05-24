import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { DEBUG_METADATA_KEY } from 'src/decorators/metadata.decorator';

@Injectable()
export class DebugLoggerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isDebug = this.reflector.get(
      DEBUG_METADATA_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest<Request>();
    const { url, method } = req;
    console.log(`${method.toUpperCase()} Request ${url} started`);
    const start = Date.now();
    return next.handle().pipe(
      tap((data) => {
        console.log(`Finished in ${Date.now() - start}ms`);
        if (isDebug) {
          console.log('Response data: ', data);
        }
        console.log('---------------------');
      }),
    );
  }
}
