// Liste paginée et filtrée des utilisateurs
export async function getUsers(req, res, next) {
  try {
    const { page = 1, pageSize = 20, search = '', role = '' } = req.query;
    const where = {};
    if (search) where.email = { contains: search, mode: 'insensitive' };
    if (role) where.role = role;
    const total = await prisma.user.count({ where });
    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' }
    });
    res.json({ users, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (err) {
    next(err);
  }
}

// Export utilisateurs filtrés en CSV
export async function exportUsersCSV(req, res, next) {
  try {
    const { search = '', role = '' } = req.query;
    const where = {};
    if (search) where.email = { contains: search, mode: 'insensitive' };
    if (role) where.role = role;
    const users = await prisma.user.findMany({ where });
    const parser = new Parser();
    const csv = parser.parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}

// Liste paginée et filtrée des notifications
export async function getNotifications(req, res, next) {
  try {
    const { page = 1, pageSize = 20, type = '', read = '' } = req.query;
    const where = {};
    if (type) where.type = type;
    if (read) where.read = read === 'true';
    const total = await prisma.notification.count({ where });
    const notifications = await prisma.notification.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' }
    });
    res.json({ notifications, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (err) {
    next(err);
  }
}

// Export notifications filtrées en CSV
export async function exportNotificationsCSV(req, res, next) {
  try {
    const { type = '', read = '' } = req.query;
    const where = {};
    if (type) where.type = type;
    if (read) where.read = read === 'true';
    const notifications = await prisma.notification.findMany({ where });
    const parser = new Parser();
    const csv = parser.parse(notifications);
    res.header('Content-Type', 'text/csv');
    res.attachment('notifications.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}

// Liste paginée et filtrée des logs (exemple, à adapter selon structure)
export async function getLogs(req, res, next) {
  try {
    const { page = 1, pageSize = 20, level = '', search = '' } = req.query;
    const where = {};
    if (level) where.level = level;
    if (search) where.message = { contains: search, mode: 'insensitive' };
    const total = await prisma.log.count({ where });
    const logs = await prisma.log.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' }
    });
    res.json({ logs, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (err) {
    next(err);
  }
}

// Export logs filtrés en CSV
export async function exportLogsCSV(req, res, next) {
  try {
    const { level = '', search = '' } = req.query;
    const where = {};
    if (level) where.level = level;
    if (search) where.message = { contains: search, mode: 'insensitive' };
    const logs = await prisma.log.findMany({ where });
    const parser = new Parser();
    const csv = parser.parse(logs);
    res.header('Content-Type', 'text/csv');
    res.attachment('logs.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}
// dashboardFiltersController.js
// Endpoints pour dashboard : filtres, pagination, exports
import prisma from '../../infrastructure/db/prismaClient.js';
import { Parser } from 'json2csv';

// Liste paginée et filtrée des produits
export async function getProducts(req, res, next) {
  try {
    const { page = 1, pageSize = 20, search = '', stock = '', synced = '' } = req.query;
    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (stock === 'low') where.stock_quantity = { lt: 5 };
    if (synced) where.woo_synced = synced === 'true';
    const total = await prisma.product.count({ where });
    const products = await prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' }
    });
    res.json({ products, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (err) {
    next(err);
  }
}

// Export produits filtrés en CSV
export async function exportProductsCSV(req, res, next) {
  try {
    const { search = '', stock = '', synced = '' } = req.query;
    const where = {};
    if (search) where.name = { contains: search, mode: 'insensitive' };
    if (stock === 'low') where.stock_quantity = { lt: 5 };
    if (synced) where.woo_synced = synced === 'true';
    const products = await prisma.product.findMany({ where });
    const parser = new Parser();
    const csv = parser.parse(products);
    res.header('Content-Type', 'text/csv');
    res.attachment('products.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}

// Liste paginée et filtrée des commandes
export async function getOrders(req, res, next) {
  try {
    const { page = 1, pageSize = 20, status = '', search = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.reference = { contains: search, mode: 'insensitive' };
    const total = await prisma.order.count({ where });
    const orders = await prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: parseInt(pageSize),
      orderBy: { createdAt: 'desc' }
    });
    res.json({ orders, total, page: parseInt(page), pageSize: parseInt(pageSize) });
  } catch (err) {
    next(err);
  }
}

// Export commandes filtrées en CSV
export async function exportOrdersCSV(req, res, next) {
  try {
    const { status = '', search = '' } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.reference = { contains: search, mode: 'insensitive' };
    const orders = await prisma.order.findMany({ where });
    const parser = new Parser();
    const csv = parser.parse(orders);
    res.header('Content-Type', 'text/csv');
    res.attachment('orders.csv');
    res.send(csv);
  } catch (err) {
    next(err);
  }
}
