import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vaccination_history } from './schemas/vaccination_history.schema';
import { CreateVaccination_historyDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccination_historyDto } from './dto/update-vaccination_history.dto';

@Injectable()
export class Vaccination_historyService {
  constructor(@InjectModel(Vaccination_history.name) private vaccination_historyModel: Model<Vaccination_history>) {}

  async create(createVaccination_historyDto: CreateVaccination_historyDto) {
    return this.vaccination_historyModel.create(createVaccination_historyDto);
  }

  async findAll() {
    return this.vaccination_historyModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.vaccination_historyModel.findById(id);
  }

  async update(id: string, updateVaccination_historyDto: UpdateVaccination_historyDto) {
    const existingVaccination_history = await this.vaccination_historyModel
      .findByIdAndUpdate(id, updateVaccination_historyDto, { new: true })
      .exec();

    if (!existingVaccination_history) {
      throw new NotFoundException('Vaccination_history not found');
    }

    return existingVaccination_history;
  }

  remove(id: string) {
    return this.vaccination_historyModel.findByIdAndDelete(id);
  }
}
