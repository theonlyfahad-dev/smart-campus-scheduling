'use client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Building2, BookOpen, AlertCircle, ArrowUpRight } from 'lucide-react';

const usageData = [
  { name: 'CS', usage: 85 },
  { name: 'EE', usage: 65 },
  { name: 'ME', usage: 45 },
  { name: 'CE', usage: 70 },
  { name: 'BBA', usage: 90 },
];

const activityData = [
  { time: '08:00', load: 20 },
  { time: '10:00', load: 85 },
  { time: '12:00', load: 45 },
  { time: '14:00', load: 90 },
  { time: '16:00', load: 30 },
];

export default function AdminDashboard() {
  const container: any = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item: any = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  const StatCard = ({ title, value, sub, icon: Icon, colorClass }: any) => (
    <motion.div variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }} className="bg-card rounded-3xl p-6 shadow-soft border border-border/50 relative overflow-hidden group cursor-default">
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-12 -mt-12 rounded-full opacity-[0.03] transition-transform duration-500 group-hover:scale-[1.8] ${colorClass}`} />
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass} bg-opacity-10 text-opacity-100`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full shadow-sm">
          +12% <ArrowUpRight className="w-3 h-3 ml-1" />
        </div>
      </div>
      <p className="text-muted-foreground text-sm font-semibold">{title}</p>
      <h3 className="text-4xl font-extrabold tracking-tighter mt-1 text-foreground">{value}</h3>
      <p className="text-xs text-muted-foreground mt-2 font-medium">{sub}</p>
    </motion.div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Campus Overview</h2>
          <p className="text-muted-foreground mt-1">Live metrics and analytics for the entire institution.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,248" sub="Active across 3 institutions" icon={Users} colorClass="bg-primary text-primary" />
        <StatCard title="Departments" value="12" sub="Fully configured" icon={Building2} colorClass="bg-secondary text-secondary" />
        <StatCard title="Active Courses" value="342" sub="Running this semester" icon={BookOpen} colorClass="bg-accent text-accent" />
        <StatCard title="Critical Conflicts" value="0" sub="All schedules resolved" icon={AlertCircle} colorClass="bg-emerald-500 text-emerald-500" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2 bg-card rounded-3xl p-6 shadow-soft border border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Campus Network Load</h3>
            <p className="text-sm text-muted-foreground font-medium">Active sessions throughout the day</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} />
                <Tooltip cursor={{ stroke: 'var(--color-border)', strokeWidth: 2, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="load" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-card rounded-3xl p-6 shadow-soft border border-border/50">
          <div className="mb-6">
            <h3 className="text-lg font-bold">Room Utilization</h3>
            <p className="text-sm text-muted-foreground font-medium">Capacity usage by department</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--color-border)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }} width={40} />
                <Tooltip cursor={{fill: 'var(--color-muted)', opacity: 0.2}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="usage" fill="var(--color-secondary)" radius={[0, 8, 8, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
