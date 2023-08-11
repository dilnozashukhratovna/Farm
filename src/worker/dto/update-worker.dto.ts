import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDto } from './create-worker.dto';
import mongoose from 'mongoose';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
    name?:string
    age?:number
    experience?: number
    speciality_id?: mongoose.Schema.Types.ObjectId
    phone_number?: string
    username?: string
    worker_schedule?: Date
}
