import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FeedingDocument = HydratedDocument<Feeding>;

@Schema()
export class Feeding {
  @Prop()
  animal_id: number;
  @Prop()
  feeding_schedules: number;
  @Prop()
  types_of_feed: string;
  @Prop()
  dietary: number;
  @Prop()
  worker_id: number;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding);
