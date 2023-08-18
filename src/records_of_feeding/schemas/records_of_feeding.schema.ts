import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type Records_of_feedingDocument = HydratedDocument<Records_of_feeding>;

@Schema()
export class Records_of_feeding {
  @Prop({required: true})
  date: Date
  @Prop({required: true})
  consumtion: number
  @Prop({required: true})
  feeding_id: number
}

export const Records_of_feedingSchema = SchemaFactory.createForClass(Records_of_feeding);
