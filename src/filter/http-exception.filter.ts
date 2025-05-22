import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { timeStamp } from 'console';
import { Request, Response } from 'express';

/**
 * Support Express adapter only
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;

    res.status(status).json({
      statusCode: status,
      timeStamp: new Date().toUTCString(),
      path: req.url,
      message,
    });
  }
}
