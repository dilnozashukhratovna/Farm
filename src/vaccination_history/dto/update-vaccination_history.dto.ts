import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccination_historyDto } from './create-vaccination_history.dto';
import mongoose from 'mongoose';

export class UpdateVaccination_historyDto extends PartialType(
  CreateVaccination_historyDto,
) {
  animal_id?: mongoose.Schema.Types.ObjectId;
  vaccine_type_id?: mongoose.Schema.Types.ObjectId;
  vaccinated_date?: Date;
  next_vaccinated_date?: Date;
  vaccination_photo?: string;
  worker_id?: mongoose.Schema.Types.ObjectId;
}
