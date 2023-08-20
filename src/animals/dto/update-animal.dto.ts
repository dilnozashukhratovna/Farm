import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from './create-animal.dto';
import mongoose from 'mongoose';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
  animal_type_id?: mongoose.Schema.Types.ObjectId;
  photos?: string;
  unique_id?: number;
}
