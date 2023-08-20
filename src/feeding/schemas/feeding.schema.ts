import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';
import { Worker } from '../../worker/schemas/worker.schema';

export type FeedingDocument = HydratedDocument<Feeding>;

@Schema()
export class Feeding {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
  @Prop()
  feeding_schedules: number;
  @Prop()
  types_of_feed: string;
  @Prop()
  dietary: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
