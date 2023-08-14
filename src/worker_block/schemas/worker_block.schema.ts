import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Worker } from '../../worker/schemas/worker.schema';
import { Block } from '../../block/schemas/block.schema';

export type Worker_blockDocument = HydratedDocument<Worker_block>;

@Schema()
export class Worker_block {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' })
  worker_id: Worker;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Block' })
  block_id: Block;
}

export const Worker_blockSchema = SchemaFactory.createForClass(Worker_block);
