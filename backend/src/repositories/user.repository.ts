// Simple in-memory storage (replace with actual database later)
import { NotFoundError, ConflictError } from '../utils/errors';

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

const users: Map<string, User> = new Map();

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = Array.from(users.values()).find((u) => u.email === email);
    return user || null;
  }

  async findById(id: string): Promise<User | null> {
    return users.get(id) || null;
  }

  async create(data: { email: string; password: string; role?: string }): Promise<User> {
    const existing = await this.findByEmail(data.email);
    if (existing) {
      throw new ConflictError('User with this email already exists');
    }

    const user: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      password: data.password,
      role: data.role || 'USER',
      createdAt: new Date(),
    };
    users.set(user.id, user);
    return user;
  }

  async update(id: string, data: Partial<{ password: string; role: string }>): Promise<User> {
    const user = users.get(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const updated = { ...user, ...data };
    users.set(id, updated);
    return updated;
  }
}
