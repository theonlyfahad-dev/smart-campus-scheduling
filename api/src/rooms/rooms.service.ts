import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({ data: createRoomDto as any });
  }

  findAll() {
    return this.prisma.room.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.room.findUnique({ where: { id } });
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto as any,
    });
  }

  remove(id: string) {
    return this.prisma.room.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
