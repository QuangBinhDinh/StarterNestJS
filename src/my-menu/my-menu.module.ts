import { Module } from '@nestjs/common';
import { MyMenuService } from './services/my-menu.service';
import { MyMenuController } from './controller/my-menu.controller';

@Module({
  controllers: [MyMenuController],
  providers: [MyMenuService],
  exports: [MyMenuService],
})
export class MyMenuModule {}
