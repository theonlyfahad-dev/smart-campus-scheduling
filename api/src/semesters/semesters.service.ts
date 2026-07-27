import { Injectable } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SemestersService {
  constructor(private prisma: PrismaService) {}

  create(createSemesterDto: CreateSemesterDto) {
    return this.prisma.semester.create({ data: createSemesterDto as any });
  }

  findAll() {
    return this.prisma.semester.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.semester.findUnique({ where: { id } });
  }

  update(id: string, updateSemesterDto: UpdateSemesterDto) {
    return this.prisma.semester.update({
      where: { id },
      data: updateSemesterDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.semester.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
