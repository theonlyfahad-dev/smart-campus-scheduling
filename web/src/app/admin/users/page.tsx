'use client';
import { DataTable } from '@/components/admin/users/data-table';
import { columns } from '@/components/admin/users/columns';
import { useQuery } from '@tanstack/react-query';
// import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Mocking actual API call to prevent failure without backend connection
      // const res = await api.get('/users');
      // return res.data;
      
      return new Promise<any[]>((resolve) => setTimeout(() => resolve([
        { id: '1', userId: 'admin', role: 'ADMIN', departmentId: null, isActive: true },
        { id: '2', userId: 'hod_cs', role: 'HOD', departmentId: 'CS', isActive: true },
        { id: '3', userId: 'fac_smith', role: 'FACULTY', departmentId: 'CS', isActive: true },
        { id: '4', userId: 'fac_doe', role: 'FACULTY', departmentId: 'EE', isActive: false },
        { id: '5', userId: 'stu_001', role: 'STUDENT', departmentId: 'ME', isActive: true },
        { id: '6', userId: 'stu_002', role: 'STUDENT', departmentId: 'CS', isActive: true },
      ]), 800));
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground mt-1">Manage administrators, faculty, and students across the institution.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </div>
      ) : (
        <DataTable columns={columns} data={users || []} />
      )}
    </div>
  );
}
