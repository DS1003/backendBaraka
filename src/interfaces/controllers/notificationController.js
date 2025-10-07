// Contrôleur pour notifications in-app (Toastify)
import PrismaNotificationRepository from '../../infrastructure/db/PrismaNotificationRepository.js';

const notificationRepository = new PrismaNotificationRepository();

export async function getUserNotifications(req, res, next) {
  try {
    const notifications = await notificationRepository.listByUser(req.user.id);
    res.json({ notifications });
  } catch (err) {
    next(err);
  }
}
