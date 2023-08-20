import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { VaccineType } from '../../vaccine_type/schemas/vaccine_type.schema';
import { Worker } from '../../worker/schemas/worker.schema';
export type Vaccination_historyDocument = HydratedDocument<Vaccination_history>;

@Schema()
export class Vaccination_history {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VaccineType' })
  vaccine_type_id: VaccineType;
  @Prop()
  vaccinated_date: Date;
  @Prop()
  next_vaccinated_date: Date;
  @Prop()
  vaccination_photo: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const Vaccination_historySchema =
  SchemaFactory.createForClass(Vaccination_history);
