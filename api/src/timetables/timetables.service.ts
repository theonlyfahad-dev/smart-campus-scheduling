import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimetablesService {
  constructor(private prisma: PrismaService) {}

  create(createDto: any) {
    return this.prisma.timetable.create({ data: createDto as any });
  }

  findAll() {
    return this.prisma.timetable.findMany({ 
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getPublicTimetable(sectionId: string) {
    const timetable = await this.prisma.timetable.findFirst({
      where: {
        status: 'PUBLISHED',
        deletedAt: null,
      },
    });

    if (!timetable) {
      throw new NotFoundException('No published timetable found');
    }

    const entries = await this.prisma.timetableEntry.findMany({
      where: {
        timetableId: timetable.id,
        sectionId,
      },
      include: {
        subject: true,
        room: true,
        faculty: true,
      }
    });

    return { timetable, entries };
  }

  async publish(id: string) {
    const timetable = await this.prisma.timetable.findUnique({ where: { id } });
    if (!timetable) throw new NotFoundException('Timetable not found');

    // Unpublish all existing versions for this dept and semester
    await this.prisma.timetable.updateMany({
      where: {
        departmentId: timetable.departmentId,
        semesterId: timetable.semesterId,
        status: 'PUBLISHED'
      },
      data: { status: 'ARCHIVED' }
    });

    return this.prisma.timetable.update({
      where: { id },
      data: { 
        status: 'PUBLISHED',
        publishedAt: new Date()
      }
    });
  }

  async rollback(id: string) {
    const oldVersion = await this.prisma.timetable.findUnique({ 
      where: { id },
      include: { entries: true }
    });
    if (!oldVersion) throw new NotFoundException();

    // Get max version
    const max = await this.prisma.timetable.findFirst({
      where: { departmentId: oldVersion.departmentId, semesterId: oldVersion.semesterId },
      orderBy: { version: 'desc' }
    });

    const nextVersion = (max?.version || 0) + 1;

    return this.prisma.timetable.create({
      data: {
        departmentId: oldVersion.departmentId,
        semesterId: oldVersion.semesterId,
        status: 'DRAFT',
        version: nextVersion,
        name: `Rollback of Version ${oldVersion.version}`,
        copiedFromId: oldVersion.id,
        entries: {
          create: oldVersion.entries.map(e => ({
            subjectId: e.subjectId,
            facultyId: e.facultyId,
            roomId: e.roomId,
            sectionId: e.sectionId,
            dayOfWeek: e.dayOfWeek,
            startTime: e.startTime,
            endTime: e.endTime
          }))
        }
      }
    });
  }
}
