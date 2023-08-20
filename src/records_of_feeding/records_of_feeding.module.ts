import { Module } from '@nestjs/common';
import { RecordsOfFeedingService } from './records_of_feeding.service';
import { RecordsOfFeedingController } from './records_of_feeding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Records_of_feeding,
  Records_of_feedingSchema,
} from './schemas/records_of_feeding.schema';
import { Feeding, FeedingSchema } from '../feeding/schemas/feeding.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Records_of_feeding.name, schema: Records_of_feedingSchema },
      { name: Feeding.name, schema: FeedingSchema },
    ]),
  ],
  controllers: [RecordsOfFeedingController],
  providers: [RecordsOfFeedingService],
})
export class RecordsOfFeedingModule {}
