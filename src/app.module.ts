import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlockModule } from './block/block.module';
import { WorkerBlockModule } from './worker_block/worker_block.module';
import { RecordsOfFeedingModule } from './records_of_feeding/records_of_feeding.module';
import { FeedingModule } from './feeding/feeding.module';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';
import { InfoModule } from './info/info.module';
import { AnimalsModule } from './animals/animals.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { MeatProductionModule } from './meat_production/meat_production.module';
import { MilkProductionModule } from './milk_production/milk_production.module';
 
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    MailModule,
    SpecialityModule,
    WorkerModule,
    BlockModule,
    WorkerBlockModule,
    RecordsOfFeedingModule,
    FeedingModule,
    VaccineModule,
    VaccinationHistoryModule,
    InfoModule,
    AnimalsModule,
    AnimalTypeModule,
    MeatProductionModule,
    MilkProductionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
