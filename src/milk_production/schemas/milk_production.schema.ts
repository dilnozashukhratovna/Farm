import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MilkProductionDocument = HydratedDocument<MilkProduction>;

@Schema()
export class MilkProduction {
  @Prop()
  milk_yield: string;
  @Prop()
  milk_schedule: Date;
  @Prop()
  milk_quality: string;
  @Prop()
  animal_id: number;
}

export const MilkProductionSchema =
  SchemaFactory.createForClass(MilkProduction);
