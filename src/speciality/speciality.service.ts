import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality } from './schemas/speciality.schema';
import { Model } from 'mongoose';

@Injectable()
export class SpecialityService {
  constructor(
    @InjectModel(Speciality.name) private specialityModel: Model<Speciality>,
  ) {}

  async create(createSpecialityDto: CreateSpecialityDto): Promise<Speciality> {
    const existingSpeciality = await this.specialityModel.findOne({
      title: createSpecialityDto.title,
    });

    if (existingSpeciality) {
      throw new Error('This kind of title already exists!');
    }

    const createdSpeciality = new this.specialityModel(createSpecialityDto);
    return createdSpeciality.save();
  }

  async findAll(): Promise<Speciality[]> {
    return this.specialityModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.specialityModel.findById(id).exec();
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    const existingSpeciality = await this.specialityModel
      .findByIdAndUpdate(id, updateSpecialityDto, { new: true })
      .exec();

    if (!existingSpeciality) {
      throw new NotFoundException('Speciality not found');
    }

    return existingSpeciality;
  }

  remove(id: string) {
    return this.specialityModel.findByIdAndDelete(id);
  }
}
