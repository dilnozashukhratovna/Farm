import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFiberProductionDto } from './dto/create-fiber_production.dto';
import { UpdateFiberProductionDto } from './dto/update-fiber_production.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FiberProduction } from './schemas/fiber_production.schema';

@Injectable()
export class FiberProductionService {
  constructor(
    @InjectModel(FiberProduction.name)
    private fiber_productionModel: Model<FiberProduction>,
  ) {}

  async create(createFiberProductionDto: CreateFiberProductionDto) {
    return this.fiber_productionModel.create(createFiberProductionDto);
  }

  async findAll() {
    return this.fiber_productionModel.find()
  }

  async findOne(id: string) {
    return this.fiber_productionModel.findById(id);
  }

  async update(id: string, updateFiberProductionDto: UpdateFiberProductionDto) {
    const existingFiberProduction = await this.fiber_productionModel
      .findByIdAndUpdate(id, updateFiberProductionDto, { new: true })
      .exec();

    if (!existingFiberProduction) {
      throw new NotFoundException('FiberProduction not found');
    }

    return existingFiberProduction;
  }

  remove(id: string) {
    return this.fiber_productionModel.findByIdAndDelete(id);
  }
}
