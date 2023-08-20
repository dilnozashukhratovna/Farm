import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from './create-info.dto';
import mongoose from 'mongoose';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
  weight?: number;
  color?: string;
  height?: number;
  breed?: string;
  gender?: string;
  birth_date?: Date;
  block_id?: mongoose.Schema.Types.ObjectId;
  animal_id?: mongoose.Schema.Types.ObjectId;
  parent_id?: number;
}
