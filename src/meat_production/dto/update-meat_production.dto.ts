import { PartialType } from '@nestjs/mapped-types';
import { CreateMeatProductionDto } from './create-meat_production.dto';

export class UpdateMeatProductionDto extends PartialType(
  CreateMeatProductionDto,
) {
  meat_yield?: string;
  slaughter_date?: Date;
  shearing_schedule?: Date;
  animal_id?: number;
}
