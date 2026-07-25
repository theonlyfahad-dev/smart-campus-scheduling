'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, RotateCcw, CheckCircle2, User } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type Course = { id: string; name: string; code: string; color: string; prof: string; duration: number };
type Slot = { day: string; time: string; courseId: string | null };

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const INITIAL_UNASSIGNED: Course[] = [
  { id: 'c1', name: 'Software Engineering', code: 'CS-301', color: 'bg-primary text-primary-foreground', prof: 'A. Turing', duration: 1 },
  { id: 'c2', name: 'Database Systems', code: 'CS-302', color: 'bg-secondary text-secondary-foreground', prof: 'A. Lovelace', duration: 1 },
  { id: 'c3', name: 'Operating Systems', code: 'CS-303', color: 'bg-accent text-accent-foreground', prof: 'J. Neumann', duration: 1 },
  { id: 'c4', name: 'Computer Networks', code: 'CS-304', color: 'bg-warning text-warning-foreground', prof: 'G. Hopper', duration: 1 },
];

export function TimetableGrid() {
  const [unassigned, setUnassigned] = useState<Course[]>(INITIAL_UNASSIGNED);
  const [grid, setGrid] = useState<Slot[]>(
    DAYS.flatMap(day => TIMES.map(time => ({ day, time, courseId: null })))
  );
  
  const [draggedCourse, setDraggedCourse] = useState<Course | null>(null);

  const handleDragStart = (e: React.DragEvent, course: Course) => {
    setDraggedCourse(course);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e: React.DragEvent, day: string, time: string) => {
    e.preventDefault();
    if (!draggedCourse) return;

    // Simulate 15% chance of conflict
    if (Math.random() > 0.85) {
      toast.error("Double Booking Detected!", {
        description: `Prof. ${draggedCourse.prof} is already teaching at ${time} on ${day}.`,
      });
      return;
    }

    setGrid(prev => prev.map(slot => 
      (slot.day === day && slot.time === time) 
        ? { ...slot, courseId: draggedCourse.id } 
        : slot
    ));

    setUnassigned(prev => prev.filter(c => c.id !== draggedCourse.id));
    setDraggedCourse(null);
    
    toast.success("Schedule Updated", {
      description: `${draggedCourse.code} assigned to ${day} ${time}`,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[800px] w-full">
      {/* Floating Unassigned Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-80 flex flex-col gap-4"
      >
        <div className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-lg">Unassigned Drafts</h3>
            <p className="text-xs text-muted-foreground mt-1">Drag and drop into the calendar</p>
          </div>
          
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            <AnimatePresence>
              {unassigned.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm text-center"
                >
                  <CheckCircle2 className="h-10 w-10 mb-3 text-emerald-500 opacity-80" />
                  All classes have been successfully scheduled!
                </motion.div>
              ) : (
                unassigned.map(course => (
                  <motion.div 
                    layoutId={course.id}
                    key={course.id}
                    draggable
                    onDragStart={(e: any) => handleDragStart(e, course)}
                    onDragEnd={() => setDraggedCourse(null)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileDrag={{ scale: 1.05, rotate: 2, cursor: 'grabbing' }}
                    className="group relative flex flex-col p-4 bg-background border border-border/50 rounded-2xl shadow-sm hover:shadow-hover cursor-grab transition-all overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${course.color.split(' ')[0]}`} />
                    <div className="flex items-center justify-between mb-2 pl-2">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider ${course.color}`}>
                        {course.code}
                      </span>
                      <GripVertical className="h-4 w-4 text-muted-foreground opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="font-bold text-sm leading-tight pl-2">{course.name}</p>
                    <div className="flex items-center mt-3 pl-2 text-xs text-muted-foreground font-medium">
                      <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mr-2">
                        <User className="w-3 h-3" />
                      </div>
                      {course.prof}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Calendar Grid (Cron/Linear Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden flex flex-col"
      >
        <div className="px-6 py-4 border-b flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-xl">Timetable</h3>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">Fall 2026 Draft</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()} className="rounded-xl text-muted-foreground hover:text-foreground">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button size="sm" className="rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-sm">
              Publish Schedule
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto bg-background/50 relative">
          <div className="min-w-[800px] h-full grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr]">
            {/* Corner Cell */}
            <div className="bg-card sticky top-0 z-20 border-b border-r border-border/50" />
            
            {/* Header Row */}
            {DAYS.map(day => (
              <div key={day} className="bg-card/90 backdrop-blur-md p-4 font-bold text-sm text-center sticky top-0 z-10 border-b border-r border-border/50 text-muted-foreground last:border-r-0">
                {day}
              </div>
            ))}

            {/* Time Rows */}
            {TIMES.map(time => (
              <React.Fragment key={time}>
                <div className="p-3 text-xs font-semibold text-muted-foreground text-center flex items-start justify-center border-b border-r border-border/50 bg-card sticky left-0 z-10 pt-4">
                  {time}
                </div>
                {DAYS.map((day, idx) => {
                  const slot = grid.find(s => s.day === day && s.time === time);
                  const assignedCourse = slot?.courseId ? INITIAL_UNASSIGNED.find(c => c.id === slot.courseId) : null;

                  return (
                    <div 
                      key={`${day}-${time}`}
                      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }}
                      onDrop={(e) => handleDrop(e, day, time)}
                      className={`relative p-1.5 border-b border-r border-border/50 transition-colors min-h-[100px] group last:border-r-0
                        ${draggedCourse && !assignedCourse ? 'hover:bg-primary/5' : 'bg-transparent'}
                      `}
                    >
                      {assignedCourse && (
                        <motion.div 
                          layoutId={assignedCourse.id}
                          className={`absolute inset-1.5 rounded-xl p-3 shadow-sm flex flex-col justify-between ${assignedCourse.color} bg-opacity-90 hover:bg-opacity-100 transition-all cursor-pointer`}
                        >
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">{assignedCourse.code}</p>
                            <p className="text-xs font-bold leading-tight">{assignedCourse.name}</p>
                          </div>
                          <div className="flex items-center text-[10px] font-medium opacity-90 mt-2 bg-black/10 w-fit px-2 py-1 rounded-lg">
                            <User className="w-3 h-3 mr-1" /> {assignedCourse.prof}
                          </div>
                        </motion.div>
                      )}
                      
                      {!assignedCourse && draggedCourse && (
                        <div className="absolute inset-1.5 border-2 border-dashed border-primary/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none bg-primary/5">
                          <span className="text-xs text-primary font-bold">Assign here</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
