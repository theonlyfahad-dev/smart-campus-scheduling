import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // 1. Create Institution
  const institution = await prisma.institution.upsert({
    where: { code: 'SCU' },
    update: {},
    create: {
      name: 'Smart Campus University',
      code: 'SCU',
    },
  });

  // 2. Create Sample Department
  const csDept = await prisma.department.upsert({
    where: { code: 'CS' },
    update: {},
    create: {
      institutionId: institution.id,
      name: 'Computer Science',
      code: 'CS',
    },
  });

  // 3. Create Administrator User
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('Admin@123', salt);

  const admin = await prisma.user.upsert({
    where: { userId: 'admin' },
    update: {},
    create: {
      userId: 'admin',
      password: hash,
      role: 'ADMIN',
      isFirstLogin: false,
      isActive: true,
    },
  });

  // 4. Create Sample HOD User
  const hodHash = await bcrypt.hash('Hod@1234', salt);
  const hod = await prisma.user.upsert({
    where: { userId: 'hod_cs' },
    update: {},
    create: {
      userId: 'hod_cs',
      password: hodHash,
      role: 'HOD',
      departmentId: csDept.id,
      isFirstLogin: true,
      isActive: true,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
