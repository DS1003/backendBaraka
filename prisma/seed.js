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

  // Seed sample products
  const productsData = [
    { name: 'MacBook Pro 16"', description: 'Apple MacBook Pro 16', price: 234000, stock: 15, sku: 'MBP-16-001', category: 'Ordinateurs', imageUrl: '/silver-macbook-on-desk.png', userId: user.id },
    { name: 'iPhone 15 Pro', description: 'Apple iPhone 15 Pro', price: 187200, stock: 5, sku: 'IPH-15P-001', category: 'Smartphones', imageUrl: '/modern-smartphone.png', userId: user.id },
    { name: 'AirPods Pro', description: 'Apple AirPods Pro', price: 47250, stock: 0, sku: 'APP-001', category: 'Audio', imageUrl: '/wireless-earbuds.png', userId: user.id },
    { name: 'iPad Air', description: 'Apple iPad Air', price: 87000, stock: 25, sku: 'IPA-001', category: 'Tablettes', imageUrl: '/ipad-on-desk.png', userId: user.id },
    { name: 'Apple Watch Series 9', description: 'Apple Watch', price: 49200, stock: 12, sku: 'AWS9-001', category: 'Montres', imageUrl: '/apple-watch.jpg', userId: user.id },
  ]

  // Utiliser createMany pour insérer les produits (skipDuplicates évite les doublons basés sur contraintes uniques)
  try {
    await prisma.product.createMany({ data: productsData, skipDuplicates: true })
    console.log('Produits échantillons créés')
  } catch (err) {
    console.warn('Erreur lors de la création en masse des produits, tentative de création individuelle...', err.message)
    for (const p of productsData) {
      try {
        await prisma.product.create({ data: p })
      } catch (e) {
        // ignore individual creation errors
      }
    }
    console.log('Produits (individuels) créés (ou existants ignorés)')
  }

  // Seed sample orders
  const productRecords = await prisma.product.findMany({ where: { userId: user.id } })
  const ordersData = [
    { wooId: '1001', status: 'delivered', total: 274800, userId: user.id, createdAt: new Date() },
    { wooId: '1002', status: 'shipped', total: 239800, userId: user.id, createdAt: new Date() },
    { wooId: '1003', status: 'processing', total: 99800, userId: user.id, createdAt: new Date() },
    { wooId: '1004', status: 'pending', total: 74700, userId: user.id, createdAt: new Date() },
    { wooId: '1005', status: 'cancelled', total: 249900, userId: user.id, createdAt: new Date() },
  ]

  for (const o of ordersData) {
    await prisma.order.create({ data: o })
  }
  console.log('Commandes échantillons créées')

  // Seed notifications
  const notificationsData = [
    { type: 'order', message: 'Nouvelle commande reçue #1001', userId: user.id, sentAt: new Date() },
    { type: 'stock', message: 'Produit en rupture: AirPods Pro', userId: user.id, sentAt: new Date(Date.now() - 1000 * 60 * 60) },
    { type: 'sync', message: 'Synchronisation terminée', userId: user.id, sentAt: new Date(Date.now() - 1000 * 60 * 30) },
  ]

  for (const n of notificationsData) {
    await prisma.notification.create({ data: n })
  }
  console.log('Notifications créées')
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
