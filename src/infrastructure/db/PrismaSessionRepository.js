// Implémentation technique du SessionRepository avec Prisma
import { PrismaClient } from '@prisma/client';
import ISessionRepository from '../../domain/repositories/ISessionRepository.js';
import Session from '../../domain/entities/Session.js';

class PrismaSessionRepository extends ISessionRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id) {
    const session = await this.prisma.session.findUnique({ where: { id } });
    return session ? new Session(session) : null;
  }

  async create(sessionData) {
    const session = await this.prisma.session.create({ data: sessionData });
    return new Session(session);
  }

  async delete(id) {
    await this.prisma.session.delete({ where: { id } });
  }

  async listByUser(userId) {
    const sessions = await this.prisma.session.findMany({ where: { userId } });
    return sessions.map(s => new Session(s));
  }
}

export default PrismaSessionRepository;
