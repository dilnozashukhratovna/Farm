import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMilkProductionDto } from './dto/create-milk_production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MilkProduction } from './schemas/milk_production.schema';

@Injectable()
export class MilkProductionService {
  constructor(@InjectModel(MilkProduction.name) private milk_productionModel: Model<MilkProduction>) {}

  async create(createMilkProductionDto: CreateMilkProductionDto) {
    return this.milk_productionModel.create(createMilkProductionDto);
  }

  async findAll() {
    return this.milk_productionModel.find()
  }

  async findOne(id: string) {
    return this.milk_productionModel.findById(id);
  }

  async update(id: string, updateMilkProductionDto: UpdateMilkProductionDto) {
    const existingMilkProduction = await this.milk_productionModel
      .findByIdAndUpdate(id, updateMilkProductionDto, { new: true })
      .exec();

    if (!existingMilkProduction) {
      throw new NotFoundException('MilkProduction not found');
    }

    return existingMilkProduction;
  }

  remove(id: string) {
    return this.milk_productionModel.findByIdAndDelete(id);
  }
}
