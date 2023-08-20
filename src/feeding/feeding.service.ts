import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feeding } from './schemas/feeding.schema';

@Injectable()
export class FeedingService {
  constructor(@InjectModel(Feeding.name) private feedingModel: Model<Feeding>) {}

  async create(createFeedingDto: CreateFeedingDto) {
    return this.feedingModel.create(createFeedingDto);
  }

  async findAll() {
    return this.feedingModel.find()
  }

  async findOne(id: string) {
    return this.feedingModel.findById(id);
  }

  async update(id: string, updateFeedingDto: UpdateFeedingDto) {
    const existingFeeding = await this.feedingModel
      .findByIdAndUpdate(id, updateFeedingDto, { new: true })
      .exec();

    if (!existingFeeding) {
      throw new NotFoundException('Feeding not found');
    }

    return existingFeeding;
  }

  remove(id: string) {
    return this.feedingModel.findByIdAndDelete(id);
  }
}
