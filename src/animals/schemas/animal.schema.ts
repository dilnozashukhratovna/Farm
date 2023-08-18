import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema()
export class Animal {
  @Prop()
  animal_type_id: number;
  @Prop()
  photos: string;
  @Prop()
  unique_id: number;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
