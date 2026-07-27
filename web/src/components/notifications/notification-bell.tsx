'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type Notification = { id: string; title: string; body: string; isRead: boolean; createdAt: string };

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Timetable Published', body: 'The Fall 2026 timetable is now active.', isRead: false, createdAt: new Date().toISOString() },
    { id: '2', title: 'Room Changed', body: 'Your Monday 09:00 lecture moved to Room 101.', isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="inline-block cursor-pointer">
        <Button variant="ghost" size="icon" className="relative rounded-full h-10 w-10 bg-muted/30 hover:bg-muted/60 transition-colors text-muted-foreground" onClick={() => setOpen(!open)}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive shadow-[0_0_0_2px_hsl(var(--background))]" />
          )}
        </Button>
      </div>
      <PopoverContent align="end" className="w-80 p-0 rounded-2xl shadow-xl overflow-hidden border-border/50">
        <div className="bg-muted/30 p-4 border-b border-border/50 flex items-center justify-between">
          <h4 className="font-bold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead} className="h-auto px-2 py-1 text-xs text-primary">
              <Check className="h-3 w-3 mr-1" /> Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
              <Bell className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`p-4 border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors flex gap-3 group ${!n.isRead ? 'bg-primary/5' : ''}`}>
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${!n.isRead ? 'bg-primary' : 'bg-transparent'}`} />
                <div className="flex-1 cursor-pointer" onClick={() => markRead(n.id)}>
                  <p className={`text-sm ${!n.isRead ? 'font-semibold' : 'font-medium'}`}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{n.body}</p>
                  <p className="text-[10px] text-muted-foreground/70 mt-2 flex items-center"><Clock className="h-3 w-3 mr-1" /> Just now</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive" onClick={() => deleteNotification(n.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
