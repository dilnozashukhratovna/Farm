import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Worker } from '../../worker/schemas/worker.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type SpecialityDocument = HydratedDocument<Speciality>;

@Schema()
export class Speciality {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }] })
  workers: Worker[];
}

export const SpecialitySchema = SchemaFactory.createForClass(Speciality);
