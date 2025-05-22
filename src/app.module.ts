import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyMenuModule } from './my-menu/my-menu.module';

@Module({
  imports: [MyMenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
