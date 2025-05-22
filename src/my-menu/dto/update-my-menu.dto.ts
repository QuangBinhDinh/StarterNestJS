import { PartialType } from '@nestjs/mapped-types';
import { CreateMyMenuDto } from './create-my-menu.dto';

export class UpdateMyMenuDto extends PartialType(CreateMyMenuDto) {}
