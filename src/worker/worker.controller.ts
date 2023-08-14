import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkerService } from './worker.service';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workerService.create(createWorkerDto);
  }

  @Get()
  findAll() {
    return this.workerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workerService
      .findOne(id)
      
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
  //   return this.workerService.update(id, updateWorkerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.workerService.remove(id);
  // }
}
