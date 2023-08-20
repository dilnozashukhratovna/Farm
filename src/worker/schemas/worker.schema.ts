import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from '../../speciality/schemas/speciality.schema';
import { Block } from '../../block/schemas/block.schema';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema()
export class Worker {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;
z
  @Prop({ required: true })
  experience: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' })
  speciality_id: Speciality;

  @Prop({ unique: true })
  phone_number: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ required: true })
  worker_schedule: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Block' }] })
  blocks: Block[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
