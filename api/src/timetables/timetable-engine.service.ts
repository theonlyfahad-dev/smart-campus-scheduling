import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimetableEngineService {
  private readonly logger = new Logger(TimetableEngineService.name);

  constructor(private prisma: PrismaService) {}

  async validateDraft(timetableId: string) {
    const entries = await this.prisma.timetableEntry.findMany({
      where: { timetableId },
      include: {
        faculty: true,
        room: true,
        section: true,
        subject: true,
      },
    });

    const conflicts = [];
    
    // Detect double bookings
    for (let i = 0; i < entries.length; i++) {
      for (let j = i + 1; j < entries.length; j++) {
        const e1 = entries[i];
        const e2 = entries[j];
        
        if (e1.dayOfWeek === e2.dayOfWeek && e1.startTime === e2.startTime) {
          // Room conflict
          if (e1.roomId === e2.roomId) {
            conflicts.push({
              severity: 'CRITICAL',
              description: `Room ${e1.room.name} is double booked on Day ${e1.dayOfWeek} at ${e1.startTime}.`,
              entries: [e1.id, e2.id]
            });
          }
          
          // Faculty conflict
          if (e1.facultyId === e2.facultyId) {
            conflicts.push({
              severity: 'CRITICAL',
              description: `Faculty ${e1.faculty.firstName} is double booked on Day ${e1.dayOfWeek} at ${e1.startTime}.`,
              entries: [e1.id, e2.id]
            });
          }

          // Section conflict
          if (e1.sectionId === e2.sectionId) {
            conflicts.push({
              severity: 'CRITICAL',
              description: `Section ${e1.section.name} is double booked on Day ${e1.dayOfWeek} at ${e1.startTime}.`,
              entries: [e1.id, e2.id]
            });
          }
        }
      }
    }

    return conflicts;
  }

  async getSuggestions(cellData: any) {
    // Return available alternatives for a conflicting slot
    return {
      alternativeRooms: [],
      alternativeFaculty: [],
    };
  }

  async generateTimetable(departmentId: string, semesterId: string) {
    // Greedy auto-generation algorithm implementation goes here
    this.logger.log(`Generating timetable for dept ${departmentId}, sem ${semesterId}`);
    return { success: true, message: "Draft generated successfully (Algorithmic logic pending strict constraints mapping)." };
  }
}
