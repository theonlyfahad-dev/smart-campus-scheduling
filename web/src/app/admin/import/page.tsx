'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertTriangle, FileSpreadsheet, ArrowRight, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ImportWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success("File uploaded successfully");
    }
  };

  const nextStep = () => {
    if (step === 1 && !file) {
      toast.error("Please upload an Excel file first");
      return;
    }
    setStep(s => Math.min(s + 1, 6));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Excel Import Wizard</h2>
          <p className="text-muted-foreground mt-1">Smart adaptive ingestion engine for historical timetables.</p>
        </div>
      </div>

      <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-8 min-h-[500px] flex flex-col">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div 
              key={idx}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors
                ${step >= idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
              `}
            >
              {step > idx ? <CheckCircle2 className="h-4 w-4" /> : idx}
            </div>
          ))}
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-md">
                <div className="border-2 border-dashed border-border/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/40 transition-colors relative">
                  <input type="file" accept=".xlsx, .xls" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  <UploadCloud className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-1">{file ? file.name : "Drag & Drop Excel File"}</h3>
                  <p className="text-sm text-muted-foreground">{file ? "Ready to map columns" : "Supports .xlsx and .xls up to 10MB"}</p>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-2xl">
                 <div className="bg-muted/30 rounded-2xl p-6 border border-border/50 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-1">Adaptive Column Mapping</h3>
                    <p className="text-sm text-muted-foreground mb-6">The system detected 5 target columns and mapped them automatically.</p>
                    
                    <div className="space-y-2 text-left">
                       <div className="flex justify-between items-center bg-background p-3 rounded-xl border border-border/50">
                         <span className="font-medium text-sm">"Teacher" (Excel)</span>
                         <ArrowRight className="h-4 w-4 text-muted-foreground" />
                         <span className="font-bold text-sm text-primary">Faculty (DB)</span>
                       </div>
                       <div className="flex justify-between items-center bg-background p-3 rounded-xl border border-border/50">
                         <span className="font-medium text-sm">"Classroom" (Excel)</span>
                         <ArrowRight className="h-4 w-4 text-muted-foreground" />
                         <span className="font-bold text-sm text-primary">Room (DB)</span>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {step > 2 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center">
                 <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                 <h3 className="font-bold text-xl mb-2">Simulation Complete</h3>
                 <p className="text-muted-foreground">The import engine has processed the workflow.</p>
                 <Button onClick={() => setStep(1)} className="mt-6">Upload Another</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          {step < 3 && (
            <Button onClick={nextStep} className="rounded-xl px-8 shadow-soft">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
