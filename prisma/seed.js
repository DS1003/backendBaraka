// Seeder Prisma pour créer un utilisateur test
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('test1234', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@neosync.fr' },
    update: {},
    create: {
      email: 'test@neosync.fr',
      password: passwordHash,
      name: 'Utilisateur Test',
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log('Utilisateur test créé :', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
