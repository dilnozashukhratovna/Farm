import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Animal } from './schemas/animal.schema';

@Injectable()
export class AnimalsService {
  constructor(@InjectModel(Animal.name) private animalModel: Model<Animal>) {}

  async create(createAnimalDto: CreateAnimalDto) {
    return this.animalModel.create(createAnimalDto);
  }

  async findAll() {
    return this.animalModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.animalModel.findById(id);
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const existingAnimal = await this.animalModel
      .findByIdAndUpdate(id, updateAnimalDto, { new: true })
      .exec();

    if (!existingAnimal) {
      throw new NotFoundException('Animal not found');
    }

    return existingAnimal;
  }

  remove(id: string) {
    return this.animalModel.findByIdAndDelete(id);
  }
}
