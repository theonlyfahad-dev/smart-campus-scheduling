'use client';

import { TimetableGrid } from '@/components/scheduling/timetable-grid';
import { Button } from '@/components/ui/button';
import { Filter, Download, Settings } from 'lucide-react';

export default function SchedulingPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Scheduling Engine</h2>
          <p className="text-muted-foreground mt-1">Live drag-and-drop timetable generation with real-time conflict detection.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" /> Preferences
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>
      
      <TimetableGrid />
    </div>
  );
}
