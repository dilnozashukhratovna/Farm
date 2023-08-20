import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Info } from './schemas/info.schema';

@Injectable()
export class InfoService {
  constructor(@InjectModel(Info.name) private infoModel: Model<Info>) {}

  async create(createInfoDto: CreateInfoDto) {
    return this.infoModel.create(createInfoDto);
  }

  async findAll() {
    return this.infoModel.find()
  }

  async findOne(id: string) {
    return this.infoModel.findById(id);
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    const existingInfo = await this.infoModel
      .findByIdAndUpdate(id, updateInfoDto, { new: true })
      .exec();

    if (!existingInfo) {
      throw new NotFoundException('Info not found');
    }

    return existingInfo;
  }

  remove(id: string) {
    return this.infoModel.findByIdAndDelete(id);
  }
}
