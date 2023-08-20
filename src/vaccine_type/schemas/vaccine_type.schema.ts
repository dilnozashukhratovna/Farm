import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Block } from '../../block/schemas/block.schema';
import { Animal } from '../../animals/schemas/animal.schema';

export type VaccineTypeDocument = HydratedDocument<VaccineType>;

@Schema()
export class VaccineType {
  @Prop()
  type_name: string;
}

export const VaccineTypeSchema = SchemaFactory.createForClass(VaccineType);
