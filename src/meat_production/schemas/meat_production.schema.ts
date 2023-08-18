import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MeatProductionDocument = HydratedDocument<MeatProduction>;

@Schema()
export class MeatProduction {
  @Prop()
  meat_yield: string;
  @Prop()
  slaughter_date: Date;
  @Prop()
  shearing_schedule: Date;
  @Prop()
  animal_id: number;
}

export const MeatProductionSchema =
  SchemaFactory.createForClass(MeatProduction);
