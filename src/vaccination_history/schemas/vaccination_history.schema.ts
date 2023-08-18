import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Vaccination_historyDocument = HydratedDocument<Vaccination_history>;

@Schema()
export class Vaccination_history {
  @Prop()
  animal_id: number;
  @Prop()
  vaccine_type_id: number;
  @Prop()
  vaccinated_date: Date;
  @Prop()
  next_vaccinated_date: Date;
  @Prop()
  vaccination_photo: string;
  @Prop()
  worker_id: number;
}

export const Vaccination_historySchema =
  SchemaFactory.createForClass(Vaccination_history);
