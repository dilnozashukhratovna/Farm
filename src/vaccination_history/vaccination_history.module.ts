import { Module } from '@nestjs/common';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { Vaccination_historyService } from './vaccination_history.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Vaccination_history,
  Vaccination_historySchema,
} from './schemas/vaccination_history.schema';
import { Animal, AnimalSchema } from '../animals/schemas/animal.schema';
import {
  VaccineType,
  VaccineTypeSchema,
} from '../vaccine_type/schemas/vaccine_type.schema';
import { Worker, WorkerSchema } from '../worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vaccination_history.name, schema: Vaccination_historySchema },
      { name: Animal.name, schema: AnimalSchema },
      { name: VaccineType.name, schema: VaccineTypeSchema },
      { name: Worker.name, schema: WorkerSchema },
    ]),
  ],
  controllers: [VaccinationHistoryController],
  providers: [Vaccination_historyService],
})
export class VaccinationHistoryModule {}
