import { UserRepository } from '../repositories/user.repository';
import { hashPassword, verifyPassword } from '../utils/password';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload,
} from '../utils/jwt';
import { UnauthorizedError } from '../utils/errors';
import { redis, isRedisAvailable } from '../config/redis';
import { env } from '../config/env';

export interface RegisterInput {
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private userRepository = new UserRepository();

  async register(input: RegisterInput): Promise<AuthResponse> {
    const hashedPassword = await hashPassword(input.password);

    const user = await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
    });

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in Redis (if available)
    if (isRedisAvailable()) {
      await redis!.setex(
        `refresh_token:${user.id}`,
        this.getRefreshTokenTTL(),
        refreshToken
      );
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isValidPassword = await verifyPassword(user.password, input.password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Store refresh token in Redis (if available)
    if (isRedisAvailable()) {
      await redis!.setex(
        `refresh_token:${user.id}`,
        this.getRefreshTokenTTL(),
        refreshToken
      );
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = verifyRefreshToken(refreshToken);

    // Verify token exists in Redis (if available)
    if (isRedisAvailable()) {
      const storedToken = await redis!.get(`refresh_token:${payload.userId}`);
      if (!storedToken || storedToken !== refreshToken) {
        throw new UnauthorizedError('Invalid refresh token');
      }
    }

    const newPayload: TokenPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    const newAccessToken = generateAccessToken(newPayload);
    const newRefreshToken = generateRefreshToken(newPayload);

    // Update refresh token in Redis (if available)
    if (isRedisAvailable()) {
      await redis!.setex(
        `refresh_token:${payload.userId}`,
        this.getRefreshTokenTTL(),
        newRefreshToken
      );
    }

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(userId: string): Promise<void> {
    if (isRedisAvailable()) {
      await redis!.del(`refresh_token:${userId}`);
    }
  }

  private getRefreshTokenTTL(): number {
    // Parse JWT_REFRESH_EXPIRES_IN (e.g., "7d" = 7 days)
    const expiresIn = env.JWT_REFRESH_EXPIRES_IN;
    if (expiresIn.endsWith('d')) {
      return parseInt(expiresIn) * 24 * 60 * 60;
    }
    if (expiresIn.endsWith('h')) {
      return parseInt(expiresIn) * 60 * 60;
    }
    if (expiresIn.endsWith('m')) {
      return parseInt(expiresIn) * 60;
    }
    return 7 * 24 * 60 * 60; // Default 7 days
  }
}

