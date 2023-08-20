import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animals/schemas/animal.schema';

export type MeatProductionDocument = HydratedDocument<MeatProduction>;

@Schema()
export class MeatProduction {
  @Prop()
  meat_yield: string;
  @Prop()
  slaughter_date: Date;
  @Prop()
  shearing_schedule: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
}

export const MeatProductionSchema =
  SchemaFactory.createForClass(MeatProduction);
