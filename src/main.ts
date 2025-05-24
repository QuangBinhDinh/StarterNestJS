import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { DebugLoggerInterceptor } from './interceptors/debug-logger/debug-logger.interceptor';
import { TransformInterceptor } from './interceptors/transform/transform.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new DebugLoggerInterceptor(reflector),
    new TransformInterceptor(reflector),
  );
  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
