# Smart Campus Scheduling & Live Conflict Resolution System

An enterprise-grade academic scheduling platform designed to simplify timetable management, eliminate room/faculty conflicts, and ensure strict departmental data isolation.

## Features
- **Strict Role-Based Access Control (RBAC):** Distinct dashboards for Administrators, HODs, Faculty, and Students.
- **Department Isolation:** HODs can only manage resources explicitly allocated to their departments.
- **Live Conflict Resolution:** O(1) database lookups ensure faculty and rooms cannot be double-booked.
- **Immutable Audit Logging:** Every schedule change is securely tracked.
- **Optimized for High Data Density:** Eliminates generic SaaS bloat in favor of Jira-style data density.

## Tech Stack
- **Backend:** Node.js with NestJS
- **Database:** Prisma ORM (SQLite for Dev, PostgreSQL recommended for Production)
- **Security:** Passport JWT Authentication, bcrypt hashing, class-validator sanitization.

## Folder Structure
```
api/
├── prisma/               # Database schema and seeders
├── src/
│   ├── auth/             # JWT, Guards, and Decorators
│   ├── users/            # User CRUD and database operations
│   ├── prisma/           # Prisma service instantiation
│   └── main.ts           # Global validation pipes and bootstrap
```

## Installation & Configuration

1. Clone the repository and install dependencies:
   ```bash
   git clone <repository-url>
   cd api
   npm install
   ```
2. Copy the environment configuration file:
   ```bash
   cp .env.example .env
   ```
3. Update `.env` with your secure production secrets.

## Database Initialization
Run the migrations and seed the database with the master Administrator:
```bash
npx prisma db push
npx prisma generate
npx ts-node prisma/seed.ts
```

## Running Locally
```bash
# Development
npm run start

# Watch mode
npm run start:dev
```

## Production Build & Deployment

### 1. Build the application
```bash
npm run build
```
The optimized bundle will be generated in the `dist/` directory.

### 2. Deployment Steps (Node Server)
Ensure the environment variable `NODE_ENV=production` is set on your server.
```bash
npm ci --only=production
npm run start:prod
```

### 3. Docker Deployment (Optional)
This repository is optimized for containerized deployment. Simply map port 3000 and provide the secure environment variables to the container runtime.

## License
MIT License. See `LICENSE` for more information.

## Contributors
* Smart Campus Development Team
