'use client';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Users, Building2, BookOpen, AlertCircle, ArrowUpRight, Activity, CalendarDays } from 'lucide-react';

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
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } } };

  const StatCard = ({ title, value, sub, icon: Icon, trend }: any) => (
    <motion.div variants={item} className="group relative bg-[#0e0e11] border border-white/5 rounded-2xl p-6 overflow-hidden hover:border-white/10 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
          {trend} <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
      <p className="text-sm font-medium text-zinc-400">{title}</p>
      <h3 className="text-3xl font-semibold tracking-tight text-white mt-1">{value}</h3>
      <p className="text-xs text-zinc-500 mt-2">{sub}</p>
    </motion.div>
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-8 space-y-8 bg-[#09090b] min-h-screen text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">System Overview</h2>
          <p className="text-zinc-400 mt-1 text-sm">Real-time metrics and campus utilization.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-zinc-400" />
            Current Semester
          </button>
          <button className="px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg text-sm font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,248" sub="Active across 3 institutions" icon={Users} trend="+12%" />
        <StatCard title="Departments" value="12" sub="Fully configured" icon={Building2} trend="+0%" />
        <StatCard title="Active Courses" value="342" sub="Running this semester" icon={BookOpen} trend="+4%" />
        <StatCard title="System Health" value="100%" sub="All services operational" icon={Activity} trend="+0%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2 bg-[#0e0e11] border border-white/5 rounded-2xl p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-white">Network Load</h3>
              <p className="text-xs text-zinc-500 mt-1">Active sessions throughout the day</p>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="load" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-[#0e0e11] border border-white/5 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-white">Room Utilization</h3>
            <p className="text-xs text-zinc-500 mt-1">Capacity usage by department</p>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} width={35} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="usage" fill="#3f3f46" radius={[0, 4, 4, 0]} barSize={16}>
                  {usageData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.usage > 80 ? '#818cf8' : '#3f3f46'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
