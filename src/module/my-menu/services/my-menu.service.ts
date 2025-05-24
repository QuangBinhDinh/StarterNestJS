import { HttpException, Injectable } from '@nestjs/common';
import { CreateMyMenuDto } from '../dto/create-my-menu.dto';
import { UpdateMyMenuDto } from '../dto/update-my-menu.dto';

@Injectable()
export class MyMenuService {
  create(createMyMenuDto: CreateMyMenuDto) {
    return 'This action adds a new myMenu';
  }

  findAll() {
    return [
      {
        id: 1,
        name: 'Menu 1',
        description: 'Menu 1 description',
      },
      {
        id: 2,
        name: 'Menu 1',
        description: 'Menu 1 description',
      },
      {
        id: 3,
        name: 'Menu 1',
        description: 'Menu 1 description',
      },
      {
        id: 4,
        name: 'Menu 1',
        description: 'Menu 1 description',
      },
      {
        id: 5,
        name: 'Menu 1',
        description: 'Menu 1 description',
      },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} myMenu`;
  }

  findQuerry(id: number, name: string) {
    if (id == 0) {
      throw new HttpException('Id is required', 400);
    }
    return `This action returns a #${id} myMenu with name ${name}`;
  }

  update(id: number, updateMyMenuDto: UpdateMyMenuDto) {
    return `This action updates a #${id} myMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} myMenu`;
  }
}
