const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const modules = ['departments', 'programs', 'semesters', 'subjects', 'rooms', 'sections'];

const srcDir = path.join(__dirname, 'src');

modules.forEach(mod => {
  const singular = mod.endsWith('s') ? mod.slice(0, -1) : mod;
  const capitalizedSingular = singular.charAt(0).toUpperCase() + singular.slice(1);
  const capitalizedModule = mod.charAt(0).toUpperCase() + mod.slice(1);

  // Generate module, controller, service
  console.log(`Generating ${mod}...`);
  try {
    execSync(`npx nest g module ${mod}`, { stdio: 'inherit' });
    execSync(`npx nest g controller ${mod} --no-spec`, { stdio: 'inherit' });
    execSync(`npx nest g service ${mod} --no-spec`, { stdio: 'inherit' });
  } catch(e) {
    console.error(e);
  }

  // Generate DTOs
  const dtoDir = path.join(srcDir, mod, 'dto');
  if (!fs.existsSync(dtoDir)) {
    fs.mkdirSync(dtoDir, { recursive: true });
  }

  const createDto = `export class Create${capitalizedSingular}Dto {
  // Add validation decorators here
}
`;
  const updateDto = `import { PartialType } from '@nestjs/mapped-types';
import { Create${capitalizedSingular}Dto } from './create-${singular}.dto';

export class Update${capitalizedSingular}Dto extends PartialType(Create${capitalizedSingular}Dto) {}
`;

  fs.writeFileSync(path.join(dtoDir, `create-${singular}.dto.ts`), createDto);
  fs.writeFileSync(path.join(dtoDir, `update-${singular}.dto.ts`), updateDto);

  // Overwrite Service
  const serviceCode = `import { Injectable } from '@nestjs/common';
import { Create${capitalizedSingular}Dto } from './dto/create-${singular}.dto';
import { Update${capitalizedSingular}Dto } from './dto/update-${singular}.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ${capitalizedModule}Service {
  constructor(private prisma: PrismaService) {}

  create(create${capitalizedSingular}Dto: Create${capitalizedSingular}Dto) {
    return this.prisma.${singular}.create({ data: create${capitalizedSingular}Dto as any });
  }

  findAll() {
    return this.prisma.${singular}.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    return this.prisma.${singular}.findUnique({ where: { id } });
  }

  update(id: string, update${capitalizedSingular}Dto: Update${capitalizedSingular}Dto) {
    return this.prisma.${singular}.update({
      where: { id },
      data: update${capitalizedSingular}Dto as any,
    });
  }

  remove(id: string) {
    return this.prisma.${singular}.update({
      where: { id },
      data: { deletedAt: new Date() } as any,
    });
  }
}
`;
  fs.writeFileSync(path.join(srcDir, mod, `${mod}.service.ts`), serviceCode);

  // Overwrite Controller
  const controllerCode = `import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ${capitalizedModule}Service } from './${mod}.service';
import { Create${capitalizedSingular}Dto } from './dto/create-${singular}.dto';
import { Update${capitalizedSingular}Dto } from './dto/update-${singular}.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'HOD')
@Controller('${mod}')
export class ${capitalizedModule}Controller {
  constructor(private readonly ${singular}Service: ${capitalizedModule}Service) {}

  @Post()
  create(@Body() create${capitalizedSingular}Dto: Create${capitalizedSingular}Dto) {
    return this.${singular}Service.create(create${capitalizedSingular}Dto);
  }

  @Get()
  findAll() {
    return this.${singular}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.${singular}Service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update${capitalizedSingular}Dto: Update${capitalizedSingular}Dto) {
    return this.${singular}Service.update(id, update${capitalizedSingular}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.${singular}Service.remove(id);
  }
}
`;
  fs.writeFileSync(path.join(srcDir, mod, `${mod}.controller.ts`), controllerCode);
});
console.log('CRUD generation complete.');
