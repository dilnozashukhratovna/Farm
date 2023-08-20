import mongoose from "mongoose";

export class CreateRecordsOfIllnessDto {
  animal_id: mongoose.Schema.Types.ObjectId;
  ilness_type: string;
  date_disease: Date;
  medicines: Date;
  treatment_day_count: number;
  illness_photo: string;
  worker_id: mongoose.Schema.Types.ObjectId;
}
