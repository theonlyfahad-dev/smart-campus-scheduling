import { Module } from '@nestjs/common';
import { TimetablesController } from './timetables.controller';
import { TimetablesService } from './timetables.service';
import { TimetableEngineService } from './timetable-engine.service';

@Module({
  controllers: [TimetablesController],
  providers: [TimetablesService, TimetableEngineService],
  exports: [TimetableEngineService]
})
export class TimetablesModule {}
