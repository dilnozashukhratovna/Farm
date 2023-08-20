import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Records_of_feeding } from './schemas/records_of_feeding.schema';
import { CreateRecordsOfFeedingDto } from './dto/create-records_of_feeding.dto';
import { UpdateRecordsOfFeedingDto } from './dto/update-records_of_feeding.dto';

@Injectable()
export class RecordsOfFeedingService {
  constructor(
    @InjectModel(Records_of_feeding.name)
    private recordsOfFeedingModel: Model<Records_of_feeding>,
  ) {}

  async create(createRecordsOfFeedingDto: CreateRecordsOfFeedingDto) {
    const createdRecordsOfFeeding = new this.recordsOfFeedingModel(
      createRecordsOfFeedingDto,
    );
    return createdRecordsOfFeeding.save();
  }

  async findAll() {
    return this.recordsOfFeedingModel.find().populate('feeding_id');
  }

  async findOne(id: string) {
    return this.recordsOfFeedingModel.findById(id).exec();
  }

  async update(
    id: string,
    updateRecordsOfFeedingDto: UpdateRecordsOfFeedingDto,
  ) {
    const existingRecordsOfFeeding = await this.recordsOfFeedingModel
      .findByIdAndUpdate(id, updateRecordsOfFeedingDto, { new: true })
      .exec();

    if (!existingRecordsOfFeeding) {
      throw new NotFoundException('Records of feeding not found');
    }

    return existingRecordsOfFeeding;
  }

  remove(id: string) {
    return this.recordsOfFeedingModel.findByIdAndDelete(id);
  }
}
