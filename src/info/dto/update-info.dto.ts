import { PartialType } from '@nestjs/mapped-types';
import { CreateInfoDto } from './create-info.dto';

export class UpdateInfoDto extends PartialType(CreateInfoDto) {
    weight?: number
    color?: string
    height?: number
    breed?: string
    gender?: string
    birth_date?: Date
    block_id?:number
    animal_id?:number
    parent_id?: number
}
