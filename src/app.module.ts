import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyMenuModule } from './my-menu/my-menu.module';
import { logger } from './logger.middleware';

@Module({
  imports: [MyMenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('my-menu/all');
  }
}
