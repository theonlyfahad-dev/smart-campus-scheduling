import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  create(createProgramDto: CreateProgramDto) {
    return this.prisma.program.create({ data: createProgramDto as any });
  }

  findAll() {
    return this.prisma.program.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.program.findUnique({ where: { id } });
  }

  update(id: string, updateProgramDto: UpdateProgramDto) {
    return this.prisma.program.update({
      where: { id },
      data: updateProgramDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.program.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
