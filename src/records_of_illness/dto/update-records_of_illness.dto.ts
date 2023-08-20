import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordsOfIllnessDto } from './create-records_of_illness.dto';
import mongoose from 'mongoose';

export class UpdateRecordsOfIllnessDto extends PartialType(
  CreateRecordsOfIllnessDto,
) {
  animal_id?: mongoose.Schema.Types.ObjectId;
  ilness_type?: string;
  date_disease?: Date;
  medicines?: Date;
  treatment_day_count?: number;
  illness_photo?: string;
  worker_id?: mongoose.Schema.Types.ObjectId;
}
