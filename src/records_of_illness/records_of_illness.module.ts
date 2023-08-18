import { Module } from '@nestjs/common';
import { RecordsOfIllnessService } from './records_of_illness.service';
import { RecordsOfIllnessController } from './records_of_illness.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RecordsOfIllness,
  RecordsOfIllnessSchema,
} from './schemas/records_of_illness.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecordsOfIllness.name, schema: RecordsOfIllnessSchema },
    ]),
  ],
  controllers: [RecordsOfIllnessController],
  providers: [RecordsOfIllnessService],
})
export class RecordsOfIllnessModule {}
