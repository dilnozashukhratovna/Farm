import mongoose from 'mongoose';

export class CreateRecordsOfFeedingDto {
  date: Date;
  consumtion: number;
  feeding_id: mongoose.Schema.Types.ObjectId;
}
