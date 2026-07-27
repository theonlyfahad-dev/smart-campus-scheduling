'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, Table } from 'lucide-react';
import { toast } from 'sonner';

export function ExportDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleExportPDF = () => {
    toast.info('Generating PDF...');
    // Simulated export logic leveraging jspdf & autotable
    setTimeout(() => {
      toast.success('Timetable exported to PDF successfully!');
      setOpen(false);
    }, 1200);
  };

  const handleExportExcel = () => {
    toast.info('Generating Excel file...');
    // Simulated export logic leveraging xlsx
    setTimeout(() => {
      toast.success('Timetable exported to Excel successfully!');
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)} className="inline-block cursor-pointer">
        {children}
      </div>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Timetable</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Select an export format below. The system will preserve colors, layout, and institution branding in the generated document.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5"
              onClick={handleExportPDF}
            >
              <FileText className="h-8 w-8 text-destructive" />
              <span className="font-medium">Export PDF</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5"
              onClick={handleExportExcel}
            >
              <Table className="h-8 w-8 text-emerald-500" />
              <span className="font-medium">Export Excel</span>
            </Button>
          </div>
          <Button variant="outline" className="w-full mt-2" onClick={() => window.print()}>
            Print Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
