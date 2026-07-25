import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updatePassword(id: string, passwordHash: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password: passwordHash, isFirstLogin: false },
    });
  }

  // Helper for tests/seeding
  async create(data: any): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
