import { Module } from '@nestjs/common';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { Vaccination_historyService } from './vaccination_history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vaccination_history, Vaccination_historySchema } from './schemas/vaccination_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vaccination_history.name, schema: Vaccination_historySchema }]),
  ],
  controllers: [VaccinationHistoryController],
  providers: [Vaccination_historyService],
})
export class VaccinationHistoryModule {}
