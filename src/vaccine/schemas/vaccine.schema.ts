import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VaccineDocument = HydratedDocument<Vaccine>;

@Schema()
export class Vaccine {
  @Prop({ required: true })
  vaccine_type: string;
  @Prop({ required: true })
  vaccine_name: string;
}

export const VaccineSchema = SchemaFactory.createForClass(Vaccine);
