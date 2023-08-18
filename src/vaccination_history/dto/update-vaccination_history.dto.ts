import { PartialType } from '@nestjs/mapped-types';
import { CreateVaccination_historyDto } from './create-vaccination_history.dto';

export class UpdateVaccination_historyDto extends PartialType(CreateVaccination_historyDto) {
    animal_id?:number
    vaccine_type_id?: number
    vaccinated_date?: Date
    next_vaccinated_date?: Date
    vaccination_photo?: string
    worker_id?: number
}
