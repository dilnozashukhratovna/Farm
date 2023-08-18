import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedingDto } from './create-feeding.dto';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {
  animal_id?: number;
  feeding_schedules?: number;
  types_of_feed?: string;
  dietary?: number;
  worker_id?: number;
}
