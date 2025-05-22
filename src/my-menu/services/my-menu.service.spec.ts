import { Test, TestingModule } from '@nestjs/testing';
import { MyMenuService } from './my-menu.service';

describe('MyMenuService', () => {
  let service: MyMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyMenuService],
    }).compile();

    service = module.get<MyMenuService>(MyMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
