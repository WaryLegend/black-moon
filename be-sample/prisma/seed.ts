import { PermissionAction, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const permissionDefinitions = [
  {
    code: 'user.read',
    resource: 'user',
    action: PermissionAction.READ,
    description: 'View workspace user accounts',
  },
  {
    code: 'user.create',
    resource: 'user',
    action: PermissionAction.CREATE,
    description: 'Create workspace user accounts',
  },
  {
    code: 'user.update',
    resource: 'user',
    action: PermissionAction.UPDATE,
    description: 'Update workspace user accounts',
  },
  {
    code: 'user.delete',
    resource: 'user',
    action: PermissionAction.DELETE,
    description: 'Deactivate or delete workspace users',
  },
  {
    code: 'role.read',
    resource: 'role',
    action: PermissionAction.READ,
    description: 'View role definitions & permissions',
  },
  {
    code: 'role.manage',
    resource: 'role',
    action: PermissionAction.MANAGE,
    description: 'Create or update role permission assignments',
  },
  {
    code: 'product.read',
    resource: 'product',
    action: PermissionAction.READ,
    description: 'View product catalog data',
  },
  {
    code: 'product.create',
    resource: 'product',
    action: PermissionAction.CREATE,
    description: 'Create new products and variants',
  },
  {
    code: 'product.update',
    resource: 'product',
    action: PermissionAction.UPDATE,
    description: 'Update products, variants, or pricing',
  },
  {
    code: 'product.delete',
    resource: 'product',
    action: PermissionAction.DELETE,
    description: 'Archive or delete products',
  },
  {
    code: 'order.read',
    resource: 'order',
    action: PermissionAction.READ,
    description: 'View all orders and their status history',
  },
  {
    code: 'order.update',
    resource: 'order',
    action: PermissionAction.UPDATE,
    description: 'Update order fulfillment data (status, shipping)',
  },
  {
    code: 'order.manage',
    resource: 'order',
    action: PermissionAction.MANAGE,
    description: 'Approve, cancel, or refund orders',
  },
  {
    code: 'inventory.manage',
    resource: 'inventory',
    action: PermissionAction.MANAGE,
    description: 'Adjust stock levels and view inventory audit trail',
  },
  {
    code: 'promotion.manage',
    resource: 'promotion',
    action: PermissionAction.MANAGE,
    description: 'Create or update promotions and campaigns',
  },
  {
    code: 'notification.manage',
    resource: 'notification',
    action: PermissionAction.MANAGE,
    description: 'Send or schedule system notifications',
  },
];

const roleDefinitions = [
  {
    name: 'ADMIN',
    description: 'System administrator',
    priority: 100,
    permissions: permissionDefinitions.map((definition) => definition.code),
  },
  {
    name: 'MANAGER',
    description: 'Store manager',
    priority: 80,
    permissions: [
      'user.read',
      'user.update',
      'role.read',
      'product.read',
      'product.create',
      'product.update',
      'order.read',
      'order.update',
      'order.manage',
      'inventory.manage',
      'promotion.manage',
      'notification.manage',
    ],
  },
  {
    name: 'STAFF',
    description: 'Fulfillment staff',
    priority: 50,
    permissions: [
      'product.read',
      'product.update',
      'order.read',
      'order.update',
      'inventory.manage',
    ],
  },
  {
    name: 'USER',
    description: 'Default shopper',
    priority: 10,
    permissions: [],
  },
];

async function seedPermissions(): Promise<void> {
  for (const definition of permissionDefinitions) {
    await prisma.permission.upsert({
      where: { code: definition.code },
      update: {
        resource: definition.resource,
        action: definition.action,
        description: definition.description,
      },
      create: definition,
    });
  }
}

async function seedRoles(): Promise<void> {
  const permissionRecords = await prisma.permission.findMany({
    where: {
      code: { in: permissionDefinitions.map((definition) => definition.code) },
    },
    select: { id: true, code: true },
  });
  const permissionByCode = new Map(
    permissionRecords.map((record) => [record.code, record.id]),
  );

  for (const roleDefinition of roleDefinitions) {
    const role = await prisma.role.upsert({
      where: { name: roleDefinition.name },
      update: {
        description: roleDefinition.description,
        priority: roleDefinition.priority,
      },
      create: {
        name: roleDefinition.name,
        description: roleDefinition.description,
        priority: roleDefinition.priority,
      },
    });

    await prisma.permissionRole.deleteMany({ where: { roleId: role.id } });

    const permissionData = roleDefinition.permissions
      .map((code) => permissionByCode.get(code))
      .filter(
        (permissionId): permissionId is number =>
          typeof permissionId === 'number',
      )
      .map((permissionId) => ({ roleId: role.id, permissionId }));

    if (permissionData.length) {
      await prisma.permissionRole.createMany({
        data: permissionData,
        skipDuplicates: true,
      });
    }
  }
}

async function main(): Promise<void> {
  await seedPermissions();
  await seedRoles();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
