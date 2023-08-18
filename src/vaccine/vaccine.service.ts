import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { UpdateVaccineDto } from './dto/update-vaccine.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vaccine } from './schemas/vaccine.schema';

@Injectable()
export class VaccineService {
  constructor(@InjectModel(Vaccine.name) private vaccineModel: Model<Vaccine>) {}

  async create(createVaccineDto: CreateVaccineDto) {
    return this.vaccineModel.create(createVaccineDto);
  }

  async findAll() {
    return this.vaccineModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.vaccineModel.findById(id);
  }

  async update(id: string, updateVaccineDto: UpdateVaccineDto) {
    const existingVaccine = await this.vaccineModel
      .findByIdAndUpdate(id, updateVaccineDto, { new: true })
      .exec();

    if (!existingVaccine) {
      throw new NotFoundException('Vaccine not found');
    }

    return existingVaccine;
  }

  remove(id: string) {
    return this.vaccineModel.findByIdAndDelete(id);
  }
}
