import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Vaccination_historyService } from './vaccination_history.service';
import { CreateVaccination_historyDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccination_historyDto } from './dto/update-vaccination_history.dto';

@Controller('vaccination-history')
export class VaccinationHistoryController {
  constructor(
    private readonly vaccinationHistoryService: Vaccination_historyService,
  ) {}

  @Post()
  create(@Body() createVaccinationHistoryDto: CreateVaccination_historyDto) {
    return this.vaccinationHistoryService.create(createVaccinationHistoryDto);
  }

  @Get()
  findAll() {
    return this.vaccinationHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vaccinationHistoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVaccinationHistoryDto: UpdateVaccination_historyDto,
  ) {
    return this.vaccinationHistoryService.update(
      id,
      updateVaccinationHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinationHistoryService.remove(id);
  }
}
