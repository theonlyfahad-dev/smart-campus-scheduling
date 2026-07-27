import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { TimetableEngineService } from './timetable-engine.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('timetables')
export class TimetablesController {
  constructor(
    private readonly timetablesService: TimetablesService,
    private readonly engineService: TimetableEngineService
  ) {}

  @Get('public/:sectionId')
  getPublicTimetable(@Param('sectionId') sectionId: string) {
    return this.timetablesService.getPublicTimetable(sectionId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD')
  @Post(':id/validate')
  validateDraft(@Param('id') id: string) {
    return this.engineService.validateDraft(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD')
  @Post('generate')
  generate(@Body() body: { departmentId: string, semesterId: string }) {
    return this.engineService.generateTimetable(body.departmentId, body.semesterId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD')
  @Post()
  create(@Body() createDto: any) {
    return this.timetablesService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD')
  @Post(':id/publish')
  publish(@Param('id') id: string) {
    return this.timetablesService.publish(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD')
  @Post(':id/rollback')
  rollback(@Param('id') id: string) {
    return this.timetablesService.rollback(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'HOD', 'FACULTY')
  @Get()
  findAll() {
    return this.timetablesService.findAll();
  }
}
