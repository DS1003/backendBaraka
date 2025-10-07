// DashboardController.js
// Endpoints statistiques et KPIs pour dashboard SaaS
import prisma from '../../infrastructure/db/prismaClient.js';

export async function getDashboardStats(req, res, next) {
  try {
    // Nombre total de produits
    const totalProducts = await prisma.product.count();
    // Nombre total de commandes
    const totalOrders = await prisma.order.count();
    // Nombre d’utilisateurs
    const totalUsers = await prisma.user.count();
    // Nombre de notifications non lues
    const unreadNotifications = await prisma.notification.count({ where: { read: false } });
    // Nombre de produits en alerte stock
    const lowStockProducts = await prisma.product.count({ where: { stock_quantity: { lt: 5 }, manage_stock: true } });
    // CA total (somme des commandes payées)
    const totalRevenue = await prisma.order.aggregate({ _sum: { total: true }, where: { status: 'completed' } });
    // Top 5 produits par ventes
    const topProducts = await prisma.product.findMany({
      orderBy: { sales_count: 'desc' },
      take: 5,
      select: { id: true, name: true, sales_count: true, stock_quantity: true }
    });
    // Evolution des commandes sur 30 jours
    const ordersByDay = await prisma.$queryRaw`SELECT DATE("createdAt") as day, COUNT(*) as count FROM "Order" WHERE "createdAt" > NOW() - INTERVAL '30 days' GROUP BY day ORDER BY day ASC`;
    // Evolution du CA sur 30 jours
    const revenueByDay = await prisma.$queryRaw`SELECT DATE("createdAt") as day, SUM(total) as revenue FROM "Order" WHERE status = 'completed' AND "createdAt" > NOW() - INTERVAL '30 days' GROUP BY day ORDER BY day ASC`;
    // Nombre de produits synchronisés WooCommerce
    const syncedProducts = await prisma.product.count({ where: { woo_synced: true } });
    // Nombre de commandes synchronisées WooCommerce
    const syncedOrders = await prisma.order.count({ where: { woo_synced: true } });
    // Nombre de produits importés Excel
    const importedProducts = await prisma.product.count({ where: { imported_excel: true } });
    // Nombre d’alertes stock envoyées
    const stockAlerts = await prisma.notification.count({ where: { type: 'stock_alert' } });
    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      unreadNotifications,
      lowStockProducts,
      totalRevenue: totalRevenue._sum.total || 0,
      topProducts,
      ordersByDay,
      revenueByDay,
      syncedProducts,
      syncedOrders,
      importedProducts,
      stockAlerts
    });
  } catch (err) {
    next(err);
  }
}
