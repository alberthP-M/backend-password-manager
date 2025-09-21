import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function userSeeder() {
  console.log('Seeding usuarios...');

  await prisma.user.create({
    data: {
      email: 'admin@fake.com',
      password: '$2b$10$s5ihrurtiPgvq3MBKlKzYuBW956FpUvgT1FtJxPs.f3Sfwo.xaT4i',
      salt: 'salt123',
      kdfIterations: 310000,
    },
  });

  console.log('Seeding de usuarios terminado.');
}
