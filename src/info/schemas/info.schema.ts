import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Block } from '../../block/schemas/block.schema';
import { Animal } from '../../animals/schemas/animal.schema';

export type InfoDocument = HydratedDocument<Info>;

@Schema()
export class Info {
  @Prop()
  weight: number;
  @Prop()
  color: string;
  @Prop()
  height: number;
  @Prop()
  breed: string;
  @Prop()
  gender: string;
  @Prop()
  birth_date: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Block' })
  block_id: Block;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' })
  animal_id: Animal;
  @Prop()
  parent_id: number;
}

export const InfoSchema = SchemaFactory.createForClass(Info);
