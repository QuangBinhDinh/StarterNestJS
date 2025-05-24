import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { stat } from 'fs';
import { map, Observable } from 'rxjs';
import {
  MESSAGE_METADATA_KEY,
  PAGING_MEATATA_KEY,
} from 'src/decorators/metadata.decorator';
import { ParsedQs } from 'qs';
import { Request } from 'express';

export type BaseResposneType<T> = {
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page_id: number;
    page_size: number;
    total_count: number;
    total_page: number;
    has_next: boolean;
  };
};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { query } = context.switchToHttp().getRequest<Request>();
    const isPagination = this.reflector.get<boolean>(
      PAGING_MEATATA_KEY,
      context.getHandler(),
    );
    const message = this.reflector.get<string>(
      MESSAGE_METADATA_KEY,
      context.getHandler(),
    );
    return next
      .handle()
      .pipe(
        map((data) =>
          this.finalizeResponse(data, message, isPagination, query),
        ),
      );
  }

  /**
   * Transform the response data, also add the meta data if enabled
   */
  private finalizeResponse<T>(
    data: T,
    message: string,
    pagination: boolean,
    query: ParsedQs,
  ): BaseResposneType<T> {
    const page_id = Number(query.page_id) || 0;
    const page_size = Number(query.page_size) || 0;
    const res: BaseResposneType<T> = {
      statusCode: 200,
      message: message || 'successful',
      data,
    };
    if (pagination && page_id > 0 && page_size > 0 && Array.isArray(res.data)) {
      const meta = {
        page_id,
        page_size,
        total_count: res.data.length,
        total_page: Math.ceil(res.data.length / page_size),
        has_next: page_id < Math.ceil(res.data.length / page_size),
      };
      res.meta = meta;
      const start = (page_id - 1) * page_size;
      const end = start + page_size;
      res.data = res.data.slice(start, end) as T;
    }
    return res;
  }
}
