import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseModule } from 'src/database/database.module';
import { taskProviders } from './task.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [TaskController],
  providers: [TaskService, ...taskProviders],
})
export class TaskModule {}
