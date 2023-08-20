import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeatProductionDto } from './dto/create-meat_production.dto';
import { UpdateMeatProductionDto } from './dto/update-meat_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeatProduction } from './schemas/meat_production.schema';

@Injectable()
export class MeatProductionService {
  constructor(
    @InjectModel(MeatProduction.name)
    private meat_productionModel: Model<MeatProduction>,
  ) {}

  async create(createMeatProductionDto: CreateMeatProductionDto) {
    return this.meat_productionModel.create(createMeatProductionDto);
  }

  async findAll() {
    return this.meat_productionModel.find()
  }

  async findOne(id: string) {
    return this.meat_productionModel.findById(id);
  }

  async update(id: string, updateMeatProductionDto: UpdateMeatProductionDto) {
    const existingMeatProduction = await this.meat_productionModel
      .findByIdAndUpdate(id, updateMeatProductionDto, { new: true })
      .exec();

    if (!existingMeatProduction) {
      throw new NotFoundException('MeatProduction not found');
    }

    return existingMeatProduction;
  }

  remove(id: string) {
    return this.meat_productionModel.findByIdAndDelete(id);
  }
}
