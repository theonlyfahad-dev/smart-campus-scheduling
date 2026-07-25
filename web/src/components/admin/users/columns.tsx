'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type UserRow = {
  id: string;
  userId: string;
  role: 'ADMIN' | 'HOD' | 'FACULTY' | 'STUDENT';
  departmentId: string | null;
  isActive: boolean;
};

export const columns: ColumnDef<UserRow>[] = [
  {
    accessorKey: 'userId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="-ml-4 h-8 data-[state=open]:bg-accent"
        >
          <span>User ID</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      const getBadgeColor = (r: string) => {
        switch (r) {
          case 'ADMIN': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
          case 'HOD': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
          case 'FACULTY': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
          case 'STUDENT': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
          default: return 'bg-gray-100 text-gray-700';
        }
      };
      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeColor(role)}`}>
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: 'departmentId',
    header: 'Department',
    cell: ({ row }) => {
      const dept = row.getValue('departmentId');
      return <div className="text-muted-foreground">{dept ? String(dept).toUpperCase() : 'Institution-wide'}</div>;
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.getValue('isActive') as boolean;
      return (
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-destructive'}`} />
          <span>{active ? 'Active' : 'Disabled'}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground outline-none">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.userId)}>
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Roles</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10">Disable Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
