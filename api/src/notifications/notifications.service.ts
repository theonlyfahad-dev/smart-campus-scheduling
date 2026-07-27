import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  getUserNotifications(targetUserId: string) {
    return this.prisma.notification.findMany({
      where: { targetUserId },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
  }

  markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });
  }

  markAllAsRead(targetUserId: string) {
    return this.prisma.notification.updateMany({
      where: { targetUserId, isRead: false },
      data: { isRead: true }
    });
  }

  deleteNotification(id: string) {
    return this.prisma.notification.delete({ where: { id } });
  }

  async createNotification(targetUserId: string, title: string, body: string) {
    return this.prisma.notification.create({
      data: {
        targetUserId,
        title,
        body
      }
    });
  }
}
