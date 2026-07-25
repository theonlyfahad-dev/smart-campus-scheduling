'use client';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LecturerDashboard() {
  const container: any = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item: any = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Lecturer Hub</h2>
          <p className="text-muted-foreground mt-1">Manage your teaching load, courses, and students.</p>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft h-11 px-6 font-semibold">
            <MessageSquare className="w-4 h-4 mr-2" /> Message Class
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div variants={item} whileHover={{ y: -4 }} className="bg-gradient-to-br from-secondary to-primary rounded-3xl p-6 text-white shadow-soft relative overflow-hidden group cursor-default">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
          <Clock className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-lg font-medium opacity-90">Teaching Load</h3>
          <p className="text-5xl font-extrabold tracking-tighter my-1">18 <span className="text-xl font-medium opacity-70">hrs/wk</span></p>
          <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-white h-full rounded-full" />
          </div>
          <p className="text-xs opacity-80 mt-2 font-medium">Nearing maximum capacity (20hrs)</p>
        </motion.div>

        <motion.div variants={item} whileHover={{ y: -4 }} className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 flex flex-col justify-between transition-transform group cursor-default">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-colors">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">Active Courses</h3>
            <p className="text-4xl font-extrabold tracking-tighter mt-1 text-foreground">4</p>
          </div>
        </motion.div>

        <motion.div variants={item} whileHover={{ y: -4 }} className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 flex flex-col justify-between transition-transform group cursor-default">
          <div className="w-12 h-12 rounded-2xl bg-warning/10 text-warning flex items-center justify-center mb-4 group-hover:bg-warning group-hover:text-white transition-colors">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-muted-foreground">Total Students</h3>
            <p className="text-4xl font-extrabold tracking-tighter mt-1 text-foreground">142</p>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div variants={item} className="bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden">
          <div className="px-6 py-5 border-b bg-muted/20">
            <h3 className="font-bold text-lg">Today's Classes</h3>
          </div>
          <div className="divide-y divide-border/50">
            {[
              { time: '09:00', course: 'Data Structures', room: 'Room 402', status: 'Completed', border: 'border-primary' },
              { time: '11:30', course: 'Algorithms', room: 'Lab B', status: 'Upcoming', border: 'border-muted' },
            ].map((cls, i) => (
              <div key={i} className="flex items-center p-6 hover:bg-muted/30 transition-colors group">
                <div className="w-16 text-center">
                  <p className="text-xl font-extrabold">{cls.time}</p>
                </div>
                <div className={`w-1.5 h-12 rounded-full mx-4 ${cls.status === 'Completed' ? 'bg-primary/20' : 'bg-border'} group-hover:bg-primary/50 transition-colors`} />
                <div className="flex-1">
                  <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{cls.course}</h4>
                  <p className="text-sm text-muted-foreground font-medium">{cls.room}</p>
                </div>
                <Button variant={cls.status === 'Completed' ? 'secondary' : 'default'} className="rounded-xl h-10 font-semibold shadow-sm">
                  {cls.status === 'Completed' ? 'View Attendance' : 'Mark Attendance'}
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
