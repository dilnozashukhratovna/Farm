import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordsOfIllnessDto } from './dto/create-records_of_illness.dto';
import { UpdateRecordsOfIllnessDto } from './dto/update-records_of_illness.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordsOfIllness } from './schemas/records_of_illness.schema';

@Injectable()
export class RecordsOfIllnessService {
  constructor(
    @InjectModel(RecordsOfIllness.name)
    private records_of_illnessModel: Model<RecordsOfIllness>,
  ) {}

  async create(createRecordsOfIllnessDto: CreateRecordsOfIllnessDto) {
    return this.records_of_illnessModel.create(createRecordsOfIllnessDto);
  }

  async findAll() {
    return this.records_of_illnessModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.records_of_illnessModel.findById(id);
  }

  async update(
    id: string,
    updateRecordsOfIllnessDto: UpdateRecordsOfIllnessDto,
  ) {
    const existingRecordsOfIllness = await this.records_of_illnessModel
      .findByIdAndUpdate(id, updateRecordsOfIllnessDto, { new: true })
      .exec();

    if (!existingRecordsOfIllness) {
      throw new NotFoundException('RecordsOfIllness not found');
    }

    return existingRecordsOfIllness;
  }

  remove(id: string) {
    return this.records_of_illnessModel.findByIdAndDelete(id);
  }
}
