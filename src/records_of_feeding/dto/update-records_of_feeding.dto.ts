import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordsOfFeedingDto } from './create-records_of_feeding.dto';
import mongoose from 'mongoose';

export class UpdateRecordsOfFeedingDto extends PartialType(
  CreateRecordsOfFeedingDto,
) {
  date?: Date;
  consumtion?: number;
  feeding_id?: mongoose.Schema.Types.ObjectId;
}
