'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Save, AlertTriangle, AlertCircle, Info, Keyboard, RotateCcw, Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

type CellData = { id: string; subject: string; faculty: string; room: string; section: string; hasConflict?: boolean; conflictMsg?: string };
type GridType = Record<string, CellData>; // key format: "day-time"

export function TimetableWorkspace() {
  const [grid, setGrid] = useState<GridType>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Last Used Values for quick filling
  const [lastUsed, setLastUsed] = useState({ subject: '', faculty: '', room: '', section: 'BSCCS3A' });

  // Refs for keyboard navigation
  const gridRef = useRef<HTMLDivElement>(null);

  // Debounced Auto Save
  useEffect(() => {
    if (Object.keys(grid).length === 0) return;
    
    const timeout = setTimeout(() => {
      saveDraft();
    }, 1500);
    return () => clearTimeout(timeout);
  }, [grid]);

  const saveDraft = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 600));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleCellClick = (key: string) => {
    setActiveCell(key);
  };

  const handleDoubleClick = (key: string) => {
    // Fill with last used values on double click if empty
    if (!grid[key]) {
      if (!lastUsed.subject) {
        toast.error("No recent values. Select manually first.");
        return;
      }
      handleCellUpdate(key, lastUsed);
    }
  };

  const handleCellUpdate = (key: string, data: Partial<CellData>) => {
    setGrid(prev => {
      const current = prev[key] || { id: Math.random().toString(), subject: '', faculty: '', room: '', section: lastUsed.section };
      return { ...prev, [key]: { ...current, ...data } };
    });
    
    // Update last used
    if (data.subject) setLastUsed(prev => ({ ...prev, subject: data.subject! }));
    if (data.faculty) setLastUsed(prev => ({ ...prev, faculty: data.faculty! }));
    if (data.room) setLastUsed(prev => ({ ...prev, room: data.room! }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!activeCell) return;
    
    const [day, time] = activeCell.split('-');
    const dayIdx = DAYS.indexOf(day);
    const timeIdx = TIMES.indexOf(time);

    let nextDay = dayIdx;
    let nextTime = timeIdx;

    if (e.key === 'ArrowRight') nextDay = Math.min(dayIdx + 1, DAYS.length - 1);
    if (e.key === 'ArrowLeft') nextDay = Math.max(dayIdx - 1, 0);
    if (e.key === 'ArrowDown') nextTime = Math.min(timeIdx + 1, TIMES.length - 1);
    if (e.key === 'ArrowUp') nextTime = Math.max(timeIdx - 1, 0);
    
    if (e.key === 'Delete' || e.key === 'Backspace') {
      setGrid(prev => {
        const next = { ...prev };
        delete next[activeCell];
        return next;
      });
      return;
    }

    if (nextDay !== dayIdx || nextTime !== timeIdx) {
      e.preventDefault();
      setActiveCell(`${DAYS[nextDay]}-${TIMES[nextTime]}`);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4" onKeyDown={handleKeyDown} tabIndex={0} ref={gridRef}>
      {/* Toolbar */}
      <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search faculty, room..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl bg-background/50 border-border/50" 
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
            <Keyboard className="h-4 w-4" />
            <span>Arrows to navigate, Del to clear, Double-click to auto-fill</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs text-muted-foreground mr-2">
            {isSaving ? (
              <span className="flex items-center text-warning"><RotateCcw className="h-3 w-3 mr-1 animate-spin" /> Saving draft...</span>
            ) : lastSaved ? (
              <span className="flex items-center text-emerald-500"><CheckCircle2 className="h-3 w-3 mr-1" /> Saved {lastSaved.toLocaleTimeString()}</span>
            ) : null}
          </div>
          <Button variant="outline" size="sm" className="rounded-xl border-border/50 shadow-sm">
            <AlertTriangle className="h-4 w-4 mr-2 text-warning" /> Validate
          </Button>
          <Button size="sm" className="rounded-xl bg-primary text-primary-foreground shadow-soft hover:bg-primary/90">
            Auto Generate
          </Button>
        </div>
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden flex flex-col min-h-[700px]">
        <div className="flex-1 overflow-auto bg-background/30 relative custom-scrollbar">
          <div className="min-w-[1000px] grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr]">
            {/* Corner Cell */}
            <div className="bg-card/95 backdrop-blur-md sticky top-0 left-0 z-30 border-b border-r border-border/50" />
            
            {/* Header Row */}
            {DAYS.map(day => (
              <div key={day} className="bg-card/95 backdrop-blur-md p-3 font-extrabold text-sm text-center sticky top-0 z-20 border-b border-r border-border/50 text-foreground uppercase tracking-wider last:border-r-0">
                {day}
              </div>
            ))}

            {/* Time Rows */}
            {TIMES.map(time => (
              <React.Fragment key={time}>
                <div className="p-3 text-xs font-bold text-muted-foreground text-center flex items-center justify-center border-b border-r border-border/50 bg-card/95 backdrop-blur-md sticky left-0 z-20">
                  {time}
                </div>
                {DAYS.map(day => {
                  const key = `${day}-${time}`;
                  const cell = grid[key];
                  const isActive = activeCell === key;

                  return (
                    <div 
                      key={key}
                      onClick={() => handleCellClick(key)}
                      onDoubleClick={() => handleDoubleClick(key)}
                      className={`relative min-h-[100px] border-b border-r border-border/50 transition-colors cursor-cell last:border-r-0 group ${isActive ? 'bg-primary/10 ring-2 ring-inset ring-primary' : 'hover:bg-muted/30'}`}
                    >
                      {cell ? (
                        <div className="absolute inset-1 p-2 rounded-xl bg-background border border-border/50 shadow-sm flex flex-col justify-between overflow-hidden">
                          <div className="flex items-start justify-between">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                              {cell.subject || 'Empty'}
                            </span>
                            {cell.hasConflict && (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <input 
                              type="text" 
                              placeholder="Faculty"
                              value={cell.faculty}
                              onChange={(e) => handleCellUpdate(key, { faculty: e.target.value })}
                              className="w-full text-xs font-medium bg-transparent border-none p-0 h-4 focus:ring-0 text-foreground placeholder:text-muted-foreground"
                            />
                            <div className="flex items-center gap-1">
                              <input 
                                type="text" 
                                placeholder="Room"
                                value={cell.room}
                                onChange={(e) => handleCellUpdate(key, { room: e.target.value })}
                                className="w-16 text-[10px] bg-muted/50 rounded-md px-1 py-0.5 border-none h-5 focus:ring-0 text-muted-foreground uppercase"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          <span className="text-[10px] font-medium text-muted-foreground/50">Double click to add</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
