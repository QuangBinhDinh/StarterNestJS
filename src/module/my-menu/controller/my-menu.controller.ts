import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  BadRequestException,
  Res,
  Inject,
  ParseIntPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { MyMenuService } from '../services/my-menu.service';
import { CreateMyMenuDto, createMyMenuSchema } from '../dto/create-my-menu.dto';
import { UpdateMyMenuDto } from '../dto/update-my-menu.dto';
import { BaseResposne } from '../base-response';
import { Response } from 'express';
import { ZodValidationPipe } from 'src/validation/zod-validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('my-menu')
@UseGuards(AuthGuard)
export class MyMenuController {
  constructor(private readonly myMenuService: MyMenuService) {}

  @Post('add')
  @UsePipes(new ZodValidationPipe(createMyMenuSchema))
  create(@Body() createMyMenuDto: CreateMyMenuDto) {
    return this.myMenuService.create(createMyMenuDto);
  }

  @Get('all')
  findAll() {
    return this.myMenuService.findAll();
  }

  @Get()
  findQuerry(
    @Query('id', new ParseIntPipe())
    id: number,
    @Query('name') name: string,
  ) {
    if (!id || !name) {
      throw new BadRequestException('Id and name are required');
    }
    return this.myMenuService.findQuerry(id, name);
  }
  @Get('validate')
  findValidateQuerry(
    @Query(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Query('name') name: string,
  ) {
    if (!id || !name) {
      throw new BadRequestException('Id and name are required');
    }
    return this.myMenuService.findQuerry(id, name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyMenuDto: UpdateMyMenuDto) {
    return this.myMenuService.update(+id, updateMyMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myMenuService.remove(+id);
  }

  @Get('sample-json')
  getSampleJson() {
    return new BaseResposne([
      {
        id: 1,
        name: 'Sample item',
      },
    ]);
  }

  @Get(`sample-json-1`)
  getJson1(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return new BaseResposne([
      {
        id: 1,
        name: 'Sample item',
      },
    ]);
  }
}
