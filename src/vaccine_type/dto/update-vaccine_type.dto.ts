import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccineTypeDto } from './create-vaccine_type.dto';

export class UpdateVaccineTypeDto extends PartialType(CreateVaccineTypeDto) {
  type_name?: string;
}
