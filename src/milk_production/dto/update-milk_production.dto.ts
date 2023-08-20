import { PartialType } from '@nestjs/mapped-types';
import { CreateMilkProductionDto } from './create-milk_production.dto';
import mongoose from 'mongoose';

export class UpdateMilkProductionDto extends PartialType(
  CreateMilkProductionDto,
) {
  milk_yield?: string;
  milk_schedule?: Date;
  milk_quality?: string;
  animal_id?: mongoose.Schema.Types.ObjectId;;
}
