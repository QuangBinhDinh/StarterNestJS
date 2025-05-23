import { HttpException, Injectable } from '@nestjs/common';
import { CreateMyMenuDto } from '../dto/create-my-menu.dto';
import { UpdateMyMenuDto } from '../dto/update-my-menu.dto';

@Injectable()
export class MyMenuService {
  create(createMyMenuDto: CreateMyMenuDto) {
    return 'This action adds a new myMenu';
  }

  findAll() {
    return `This action returns all myMenu`;
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
