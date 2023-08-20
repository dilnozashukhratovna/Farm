import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnimalType } from './schemas/animal_type.schema';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectModel(AnimalType.name) private animal_typeModel: Model<AnimalType>,
  ) {}

  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return this.animal_typeModel.create(createAnimalTypeDto);
  }

  async findAll() {
    return this.animal_typeModel.find()
  }

  async findOne(id: string) {
    return this.animal_typeModel.findById(id);
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    const existingAnimalType = await this.animal_typeModel
      .findByIdAndUpdate(id, updateAnimalTypeDto, { new: true })
      .exec();

    if (!existingAnimalType) {
      throw new NotFoundException('AnimalType not found');
    }

    return existingAnimalType;
  }

  remove(id: string) {
    return this.animal_typeModel.findByIdAndDelete(id);
  }
}
