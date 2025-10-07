// Implémentation technique du UserRepository avec Prisma
import { PrismaClient } from '@prisma/client';
import IUserRepository from '../../domain/repositories/IUserRepository.js';
import User from '../../domain/entities/User.js';

class PrismaUserRepository extends IUserRepository {
  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  async findById(id) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? new User(user) : null;
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }

  async create(userData) {
    const user = await this.prisma.user.create({ data: userData });
    return new User(user);
  }

  async update(userData) {
    const user = await this.prisma.user.update({ where: { id: userData.id }, data: userData });
    return new User(user);
  }

  async delete(id) {
    await this.prisma.user.delete({ where: { id } });
  }

  async listAll() {
    const users = await this.prisma.user.findMany();
    return users.map(u => new User(u));
  }
}

export default PrismaUserRepository;
