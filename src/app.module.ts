import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlockModule } from './block/block.module';
import { WorkerBlockModule } from './worker_block/worker_block.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
