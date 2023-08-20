import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedingDto } from './create-feeding.dto';
import mongoose from 'mongoose';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {
  animal_id?: mongoose.Schema.Types.ObjectId;
  feeding_schedules?: number;
  types_of_feed?: string;
  dietary?: number;
  worker_id?: mongoose.Schema.Types.ObjectId;
}
