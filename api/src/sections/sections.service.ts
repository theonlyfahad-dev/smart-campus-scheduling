import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SectionsService {
  constructor(private prisma: PrismaService) {}

  create(createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({ data: createSectionDto as any });
  }

  findAll() {
    return this.prisma.section.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.section.findUnique({ where: { id } });
  }

  update(id: string, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.section.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
