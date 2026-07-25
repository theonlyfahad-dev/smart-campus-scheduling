import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 mx-auto max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Layers className="h-6 w-6 text-primary" />
            <span>Smart Campus</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Enterprise Academic Scheduling, <span className="text-primary">Solved.</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl leading-relaxed">
                A production-grade scheduling engine for modern universities. Prevent double bookings, automate room allocations, and strictly isolate department data.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto font-medium h-12 px-8">
                  Access Portal
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8">
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Engineered for Complexity</h2>
              <p className="mt-4 text-muted-foreground md:text-lg">Everything you need to run a massive institution seamlessly.</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start p-6 bg-muted/50 rounded-2xl border border-border/50">
                <div className="p-3 bg-primary/10 rounded-xl mb-5">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Conflict Resolution</h3>
                <p className="text-muted-foreground leading-relaxed">O(1) conflict lookups ensure faculty and rooms are never double-booked across the entire campus.</p>
              </div>

              <div className="flex flex-col items-start p-6 bg-muted/50 rounded-2xl border border-border/50">
                <div className="p-3 bg-primary/10 rounded-xl mb-5">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Department Isolation</h3>
                <p className="text-muted-foreground leading-relaxed">Strict Role-Based Access Control ensures HODs can only access and modify their own departmental resources.</p>
              </div>

              <div className="flex flex-col items-start p-6 bg-muted/50 rounded-2xl border border-border/50">
                <div className="p-3 bg-primary/10 rounded-xl mb-5">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast UI</h3>
                <p className="text-muted-foreground leading-relaxed">Built with Next.js 15, React 19, and optimistic UI updates for a desktop-class software experience in the browser.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-8 mt-auto bg-muted/20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Smart Campus Scheduling. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
