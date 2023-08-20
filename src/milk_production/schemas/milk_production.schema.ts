import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type MilkProductionDocument = HydratedDocument<MilkProduction>;

@Schema()
export class MilkProduction {
  @Prop()
  milk_yield: string;
  @Prop()
  milk_schedule: Date;
  @Prop()
  milk_quality: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
}

export const MilkProductionSchema =
  SchemaFactory.createForClass(MilkProduction);
