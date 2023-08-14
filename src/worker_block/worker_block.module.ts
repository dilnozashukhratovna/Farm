import { Module } from '@nestjs/common';
import { WorkerBlockService } from './worker_block.service';
import { WorkerBlockController } from './worker_block.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Worker_block,
  Worker_blockSchema,
} from './schemas/worker_block.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';
import { Block, BlockSchema } from '../block/schemas/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Worker_block.name, schema: Worker_blockSchema },
      { name: Worker.name, schema: WorkerSchema },
      { name: Block.name, schema: BlockSchema },
    ]),
  ],
  controllers: [WorkerBlockController],
  providers: [WorkerBlockService],
}) 
export class WorkerBlockModule {}
