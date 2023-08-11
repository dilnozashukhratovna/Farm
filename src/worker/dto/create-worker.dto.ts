import mongoose from 'mongoose';

export class CreateWorkerDto {
  name: string;
  age: number;
  experience: number;
  speciality_id: mongoose.Schema.Types.ObjectId;
  phone_number: string;
  username: string;
  worker_schedule: Date;
}
