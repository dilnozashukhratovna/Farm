import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block } from './schemas/block.schema';

@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<Block>) {}

  async create(createBlockDto: CreateBlockDto) {
    return this.blockModel.create(createBlockDto);
  }

  async findAll() {
    return this.blockModel.find().populate('workers');
  }

  async findOne(id: string) {
    return this.blockModel.findById(id);
  }

  async update(id: string, updateBlockDto: UpdateBlockDto) {
    const existingBlock = await this.blockModel
      .findByIdAndUpdate(id, updateBlockDto, { new: true })
      .exec();

    if (!existingBlock) {
      throw new NotFoundException('Block not found');
    }

    return existingBlock;
  }

  remove(id: string) {
    return this.blockModel.findByIdAndDelete(id);
  }
}
