const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('Fahad@0232', salt);
  
  // Need a department for HOD
  let dept = await prisma.department.findFirst();
  if (!dept) {
     const inst = await prisma.institution.create({ data: { name: 'Demo Inst', code: 'DEMO' } });
     dept = await prisma.department.create({ data: { name: 'Demo Dept', code: 'DD', institutionId: inst.id } });
  }

  const user = await prisma.user.upsert({
    where: { userId: 'hod@invertis.in' },
    update: { password: hash, role: 'HOD', isActive: true, isFirstLogin: false, departmentId: dept.id },
    create: {
      userId: 'hod@invertis.in',
      password: hash,
      role: 'HOD',
      isFirstLogin: false,
      isActive: true,
      departmentId: dept.id
    }
  });
  console.log('Upserted user:', user.userId);
}
main().catch(console.error).finally(() => prisma.$disconnect());
