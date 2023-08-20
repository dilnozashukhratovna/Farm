import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { Worker } from '../../worker/schemas/worker.schema';

export type RecordsOfIllnessDocument = HydratedDocument<RecordsOfIllness>;

@Schema()
export class RecordsOfIllness {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const RecordsOfIllnessSchema =
  SchemaFactory.createForClass(RecordsOfIllness);
