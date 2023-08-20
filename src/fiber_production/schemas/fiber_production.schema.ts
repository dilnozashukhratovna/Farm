import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type FiberProductionDocument = HydratedDocument<FiberProduction>;

@Schema()
export class FiberProduction {
  @Prop()
  fiber_yield: string;
  @Prop()
  shearing_schedule: Date;
  @Prop()
  fiber_quality: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
}

export const FiberProductionSchema =
  SchemaFactory.createForClass(FiberProduction);
