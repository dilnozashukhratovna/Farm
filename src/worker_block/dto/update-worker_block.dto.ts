import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerBlockDto } from './create-worker_block.dto';
import mongoose from 'mongoose';

export class UpdateWorkerBlockDto extends PartialType(CreateWorkerBlockDto) {
    worker_id?: mongoose.Schema.Types.ObjectId;
    block_id?: mongoose.Schema.Types.ObjectId;
}
