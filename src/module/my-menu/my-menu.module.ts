import { Module } from '@nestjs/common';
import { MyMenuService } from './services/my-menu.service';
import { MyMenuController } from './controller/my-menu.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  //imports: [AuthModule],
  controllers: [MyMenuController],
  providers: [MyMenuService],
  exports: [MyMenuService],
})
export class MyMenuModule {}
