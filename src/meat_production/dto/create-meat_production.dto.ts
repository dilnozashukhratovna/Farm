import mongoose from 'mongoose';

export class CreateMeatProductionDto {
  meat_yield: string;
  slaughter_date: Date;
  shearing_schedule: Date;
  animal_id: mongoose.Schema.Types.ObjectId;
}
