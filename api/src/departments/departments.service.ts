import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({ data: createDepartmentDto as any });
  }

  findAll() {
    return this.prisma.department.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.department.findUnique({ where: { id } });
  }

  update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
