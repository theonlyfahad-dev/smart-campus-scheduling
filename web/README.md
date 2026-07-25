# Smart Campus Scheduling System - Frontend

Production-grade Next.js 15 frontend for the Smart Campus platform.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- TailwindCSS (v4)
- shadcn/ui
- Zustand (State Management)
- TanStack Query (Data Fetching)
- Axios (API Layer)
- React Hook Form + Zod (Validation)

## Features
- **Role-based Dashboards:** Admin, HOD, Faculty, Student.
- **Scheduling Engine:** Interactive drag & drop timetable with live conflict detection.
- **Enterprise Tables:** Sortable, filterable data tables for User & Department management.
- **Authentication:** JWT integrated with backend, persistent sessions via Zustand.

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
2. **Environment Variables**
   Create a `.env.local` file in the `web` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Folder Structure
- `/src/app` - Next.js App Router (Pages, Layouts)
- `/src/components` - Shared UI components (shadcn)
- `/src/lib` - API interceptors, Zustand store, utils
- `/src/providers` - Global providers (React Query, Theme)

## Deployment (Vercel)
This project is optimized for Vercel. 
1. Connect your GitHub repository to Vercel.
2. Set the Root Directory to `web`.
3. Set the `NEXT_PUBLIC_API_URL` environment variable to your production NestJS backend URL.
4. Deploy!
