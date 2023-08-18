import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Speciality } from '../speciality/schemas/speciality.schema';
import { Worker } from './schemas/worker.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<Worker>,
    @InjectModel(Speciality.name) private specialityModel: Model<Speciality>,
  ) {}

  // Create Worker
  async create(createWorkerDto: CreateWorkerDto) {
    const { speciality_id } = createWorkerDto;
    const spec = await this.specialityModel.findById(speciality_id);
    if (!spec) {
      throw new BadRequestException("Bunday spec yo'q!");
    }
    const worker = await this.workerModel.create(createWorkerDto);
    spec.workers.push(worker);
    await spec.save();
    return spec;
  }

  async findAll(): Promise<Worker[]> {
    const workers = await this.workerModel
      .find()
      .populate('speciality_id')
      .populate('blocks')
      .exec();

    return workers;
  }
  findOne(id: string) {
    return this.workerModel.findById(id);
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    const existingValue = await this.workerModel
      .findByIdAndUpdate(id, updateWorkerDto, { new: true })
      .exec();

    if (!existingValue) {
      throw new NotFoundException('Worker not found');
    }

    return existingValue;
  }

  remove(id: string) {
    return this.workerModel.deleteOne({ id });
  }
}
