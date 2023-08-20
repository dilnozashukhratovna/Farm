import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVaccineTypeDto } from './dto/create-vaccine_type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VaccineType } from './schemas/vaccine_type.schema';

@Injectable()
export class VaccineTypeService {
  constructor(
    @InjectModel(VaccineType.name)
    private vaccine_typeModel: Model<VaccineType>,
  ) {}

  async create(createVaccineTypeDto: CreateVaccineTypeDto) {
    return this.vaccine_typeModel.create(createVaccineTypeDto);
  }

  async findAll() {
    return this.vaccine_typeModel
      .find()
      .populate('animal_id')
      .populate('block_id');
  }

  async findOne(id: string) {
    return this.vaccine_typeModel.findById(id);
  }

  async update(id: string, updateVaccineTypeDto: UpdateVaccineTypeDto) {
    const existingVaccineType = await this.vaccine_typeModel
      .findByIdAndUpdate(id, updateVaccineTypeDto, { new: true })
      .exec();

    if (!existingVaccineType) {
      throw new NotFoundException('VaccineType not found');
    }

    return existingVaccineType;
  }

  remove(id: string) {
    return this.vaccine_typeModel.findByIdAndDelete(id);
  }
}
