import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RecordsOfIllnessDocument = HydratedDocument<RecordsOfIllness>;

@Schema()
export class RecordsOfIllness {
  @Prop()
  animal_id: number;
  @Prop()
  ilness_type: string;
  @Prop()
  date_disease: Date;
  @Prop()
  medicines: Date;
  @Prop()
  treatment_day_count: number;
  @Prop()
  illness_photo: string;
  @Prop()
  worker_id: number;
}

export const RecordsOfIllnessSchema =
  SchemaFactory.createForClass(RecordsOfIllness);
