import { Test, TestingModule } from '@nestjs/testing';
import { MyMenuController } from './my-menu.controller';
import { MyMenuService } from '../services/my-menu.service';

describe('MyMenuController', () => {
  let controller: MyMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyMenuController],
      providers: [MyMenuService],
    }).compile();

    controller = module.get<MyMenuController>(MyMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
