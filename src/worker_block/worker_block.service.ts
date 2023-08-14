import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkerBlockDto } from './dto/create-worker_block.dto';
import { UpdateWorkerBlockDto } from './dto/update-worker_block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worker_block } from './schemas/worker_block.schema';

@Injectable()
export class WorkerBlockService {
  constructor(
    @InjectModel(Worker_block.name)
    private workerBlockModel: Model<Worker_block>,
  ) {}

  async create(
    createWorkerBlockDto: CreateWorkerBlockDto,
  ): Promise<Worker_block> {
    const value = new this.workerBlockModel(createWorkerBlockDto);
    return value.save();
  }

  findAll() {
    return this.workerBlockModel.find();
  }

  findOne(id: string) {
    return this.workerBlockModel.findById(id);
  }

  async update(id: string, updateWorkerBlockDto: UpdateWorkerBlockDto) {
    const existingValue = await this.workerBlockModel
      .findByIdAndUpdate(id, updateWorkerBlockDto, { new: true })
      .exec();

    if (!existingValue) {
      throw new NotFoundException('Speciality not found');
    }

    return existingValue;
  }

  remove(id: string) {
    return this.workerBlockModel.findOneAndDelete({ id });
  }
}
