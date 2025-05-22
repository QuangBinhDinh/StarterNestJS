import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      var message = 'Validation failed - ';
      if (error instanceof ZodError) {
        const firstErr = error.errors[0];
        if (!!firstErr) {
          const path = firstErr.path[0];
          if (!!path) {
            message += 'Error in {' + path + '} : ' + firstErr.message + '';
            throw new BadRequestException(message);
          }
        }
      }
      throw new BadRequestException('Validation failed:');
    }
  }
}
