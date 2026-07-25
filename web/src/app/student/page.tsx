'use client';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, AlertCircle, TrendingUp, CheckCircle, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StudentDashboard() {
  const container: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome & Exam Countdown */}
      <motion.div variants={item} className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-white shadow-soft relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Welcome back, Sarah!</h2>
          <p className="text-white/80 max-w-md">You have 3 classes today and 2 upcoming deadlines this week. Keep up the great work.</p>
          <div className="mt-6 flex gap-4 relative z-10">
            <Button className="bg-white text-primary hover:bg-white/90 rounded-xl font-semibold shadow-sm h-11 px-6">Join Next Class</Button>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 rounded-xl h-11 px-6">View Syllabus</Button>
          </div>
        </div>
        
        <div className="w-full md:w-72 bg-card rounded-3xl p-6 shadow-soft border border-border/50 flex flex-col justify-center items-center text-center group cursor-default">
          <p className="text-sm font-medium text-muted-foreground mb-2 tracking-wide uppercase">Midterms In</p>
          <div className="text-5xl font-extrabold text-foreground tracking-tighter mb-1 group-hover:scale-110 transition-transform duration-300">14<span className="text-xl text-muted-foreground font-medium ml-1">Days</span></div>
          <div className="w-full h-2 bg-muted rounded-full mt-4 overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '60%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-warning" />
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Today's Schedule */}
        <motion.div variants={item} className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold tracking-tight">Today's Schedule</h3>
            <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-xl">Full Timetable</Button>
          </div>
          
          <div className="space-y-3">
            {[
              { time: '09:00', title: 'Operating Systems', room: 'Room 304', prof: 'Alan Turing', color: 'bg-primary', light: 'bg-primary/10', text: 'text-primary' },
              { time: '11:00', title: 'Software Engineering', room: 'Lab A', prof: 'Ada Lovelace', color: 'bg-secondary', light: 'bg-secondary/10', text: 'text-secondary' },
              { time: '14:30', title: 'Discrete Math', room: 'Hall B', prof: 'John von Neumann', color: 'bg-accent', light: 'bg-accent/10', text: 'text-accent' },
            ].map((c, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.01, y: -2 }}
                className="group flex gap-4 p-4 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-hover transition-all cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold ${c.light} ${c.text}`}>
                  <span className="text-lg">{c.time.split(':')[0]}</span>
                  <span className="text-xs opacity-70">{c.time.split(':')[1]}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{c.title}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mt-1.5 gap-4 font-medium">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 opacity-70"/> 1h 30m</span>
                    <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1.5 opacity-70"/> {c.room}</span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center pr-2">
                  <div className="px-3 py-1.5 rounded-xl bg-muted text-xs font-semibold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
                    {c.prof}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar: Tasks & Progress */}
        <motion.div variants={item} className="space-y-6">
          <Card className="rounded-3xl border-border/50 shadow-soft overflow-hidden">
            <CardHeader className="bg-muted/30 border-b pb-4 px-6 pt-6">
              <CardTitle className="text-lg flex items-center justify-between">
                Upcoming Deadlines
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-warning" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                <div className="p-6 hover:bg-muted/20 transition-colors cursor-pointer group">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">OS Kernel Module</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">Due tomorrow at 11:59 PM</p>
                </div>
                <div className="p-6 hover:bg-muted/20 transition-colors cursor-pointer group">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">Math Problem Set 4</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">Due Friday at 5:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/50 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Attendance</h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-4xl font-extrabold tracking-tighter text-emerald-500 mb-3">94%</div>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">You are above the 85% requirement. Great job maintaining your streak!</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
