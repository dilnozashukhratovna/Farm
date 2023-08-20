import mongoose from "mongoose";

export class CreateFeedingDto {
  animal_id: mongoose.Schema.Types.ObjectId;
  feeding_schedules: number;
  types_of_feed: string;
  dietary: number;
  worker_id:  mongoose.Schema.Types.ObjectId;
}
