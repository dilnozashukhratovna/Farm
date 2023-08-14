import mongoose from 'mongoose';

export class CreateWorkerBlockDto {
  worker_id: mongoose.Schema.Types.ObjectId;
  block_id: mongoose.Schema.Types.ObjectId;
}
