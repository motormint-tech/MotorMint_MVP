import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from '../services/auth.service';
import { sendResponse } from '../utils/response';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validations/auth.validation';

export class AuthController {
  private authService = new AuthService();

  async register(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = registerSchema.parse({ body: request.body });
    const result = await this.authService.register(body);
    return sendResponse(reply, 201, result, 'User registered successfully');
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = loginSchema.parse({ body: request.body });
    const result = await this.authService.login(body);
    return sendResponse(reply, 200, result, 'Login successful');
  }

  async refreshToken(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { body } = refreshTokenSchema.parse({ body: request.body });
    const result = await this.authService.refreshToken(body.refreshToken);
    return sendResponse(reply, 200, result, 'Token refreshed successfully');
  }

  async logout(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    if (!request.user) {
      return sendResponse(reply, 401, null, 'Unauthorized');
    }

    await this.authService.logout(request.user.userId);
    return sendResponse(reply, 200, null, 'Logged out successfully');
  }
}

