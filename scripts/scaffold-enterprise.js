import * as fs from 'fs';
import * as path from 'path';

const modules = [
  'auth',
  'patient',
  'doctor',
  'facility',
  'health-card',
  'appointment',
  'report',
  'insurance',
  'cms',
  'admin'
];

const subdirs = [
  'presentation/controllers',
  'presentation/dto',
  'application/use-cases',
  'application/commands',
  'application/queries',
  'domain/entities',
  'domain/value-objects',
  'domain/repositories',
  'domain/interfaces',
  'infrastructure/database',
  'infrastructure/mappers',
  'infrastructure/validators',
  'tests'
];

const rootDirs = [
  'shared/constants',
  'shared/enums',
  'shared/utils',
  'shared/interfaces',
  'common/filters',
  'common/guards',
  'common/interceptors',
  'common/pipes',
  'common/decorators',
  'common/interfaces',
  'core/health',
  'config',
  'database',
  'docs/architecture',
  'docs/database',
  'docs/api',
  'docs/security',
  'docs/deployment',
  'docs/testing',
  'docs/standards',
  'scripts',
  'test'
];

const basePath = 'E:/hvapi';

// Create Root Directories
rootDirs.forEach(dir => {
  const fullPath = path.join(basePath, 'src', dir);
  fs.mkdirSync(fullPath, { recursive: true });
});

// Create Module Structures & Placeholders
modules.forEach(mod => {
  subdirs.forEach(sub => {
    const fullPath = path.join(basePath, 'src/modules', mod, sub);
    fs.mkdirSync(fullPath, { recursive: true });
  });

  const camelMod = mod.replace(/-([a-z])/g, g => g[1].toUpperCase());
  const pascalMod = camelMod.charAt(0).toUpperCase() + camelMod.slice(1);

  // 1. Controller Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `presentation/controllers/${mod}.controller.ts`),
    `import { Controller } from '@nestjs/common';\nimport { ApiTags } from '@nestjs/swagger';\n\n@ApiTags('${pascalMod}')\n@Controller('${mod}')\nexport class ${pascalMod}Controller {\n  // TODO: Phase 5 Implementation\n}\n`
  );

  // 2. DTO Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `presentation/dto/${mod}.dto.ts`),
    `// TODO: Phase 5 - ${pascalMod} Data Transfer Objects\nexport class ${pascalMod}RequestDto {}\nexport class ${pascalMod}ResponseDto {}\n`
  );

  // 3. Service Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `application/use-cases/${mod}.service.ts`),
    `import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${pascalMod}Service {\n  // TODO: Phase 5 Application Service Implementation\n}\n`
  );

  // 4. Entity Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `domain/entities/${mod}.entity.ts`),
    `// TODO: Phase 5 - ${pascalMod} Domain Entity\nexport class ${pascalMod}Entity {\n  id!: string;\n}\n`
  );

  // 5. Repository Interface Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `domain/repositories/${mod}.repository.interface.ts`),
    `// TODO: Phase 5 - ${pascalMod} Repository Interface\nexport interface I${pascalMod}Repository {}\n`
  );

  // 6. Repository Implementation Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `infrastructure/database/${mod}.repository.ts`),
    `import { Injectable } from '@nestjs/common';\nimport { I${pascalMod}Repository } from '../../domain/repositories/${mod}.repository.interface';\n\n@Injectable()\nexport class ${pascalMod}Repository implements I${pascalMod}Repository {\n  // TODO: Phase 5 Repository Implementation\n}\n`
  );

  // 7. Mapper Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `infrastructure/mappers/${mod}.mapper.ts`),
    `// TODO: Phase 5 - ${pascalMod} Domain Mapper\nexport class ${pascalMod}Mapper {}\n`
  );

  // 8. Module Placeholder
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, `${mod}.module.ts`),
    `import { Module } from '@nestjs/common';\nimport { ${pascalMod}Controller } from './presentation/controllers/${mod}.controller';\nimport { ${pascalMod}Service } from './application/use-cases/${mod}.service';\nimport { ${pascalMod}Repository } from './infrastructure/database/${mod}.repository';\n\n@Module({\n  controllers: [${pascalMod}Controller],\n  providers: [${pascalMod}Service, ${pascalMod}Repository],\n  exports: [${pascalMod}Service],\n})\nexport class ${pascalMod}Module {}\n`
  );

  // 9. README.md
  fs.writeFileSync(
    path.join(basePath, 'src/modules', mod, 'README.md'),
    `# ${pascalMod} Module Architecture Documentation\n\n` +
    `## Purpose\nScaffolded enterprise domain module for ${pascalMod}.\n\n` +
    `## PRD Mapping\nMapped to PRD ${pascalMod} Domain Requirements.\n\n` +
    `## Owned APIs\nAll /api/v1/${mod}/* endpoints.\n\n` +
    `## Owned Database Entities\n${pascalMod} primary and supporting entities.\n\n` +
    `## Dependencies\nAuthModule, SharedModule, DatabaseModule.\n\n` +
    `## Out of Scope\nAny feature not documented in approved PRD.\n\n` +
    `## Implementation Status\n- [x] Blueprint Ready\n- [x] Scaffold Ready\n- [ ] Implementation Pending\n- [ ] Testing Pending\n- [ ] Production Pending\n`
  );
});

// Documentation Placeholders
const docs = [
  'docs/architecture/architecture-overview.md',
  'docs/database/database-design.md',
  'docs/api/api-specification.md',
  'docs/security/security-architecture.md',
  'docs/deployment/deployment-guide.md',
  'docs/testing/testing-strategy.md',
  'docs/standards/coding-standards.md',
  'docs/CONTRIBUTING.md'
];

docs.forEach(doc => {
  const fullPath = path.join(basePath, doc);
  fs.writeFileSync(fullPath, `# ${path.basename(doc, '.md').toUpperCase()}\n\nPlaceholder documentation for HVAPI.\n`);
});

console.log('Successfully scaffolded all 10 domain modules, root directories, placeholders, and documentation files.');
