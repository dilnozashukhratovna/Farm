import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FiberProductionDocument = HydratedDocument<FiberProduction>;

@Schema()
export class FiberProduction {
  @Prop()
  fiber_yield: string;
  @Prop()
  shearing_schedule: Date;
  @Prop()
  fiber_quality: string;
  @Prop()
  animal_id: number;
}

export const FiberProductionSchema =
  SchemaFactory.createForClass(FiberProduction);
