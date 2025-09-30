# MotorMint Backend API

A production-ready, scalable backend API for the MotorMint application built with Node.js, TypeScript, Fastify, Prisma, PostgreSQL, and Redis.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with access/refresh tokens and role-based access control
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for caching and rate limiting
- **Validation**: Zod schema validation for all endpoints
- **Security**: Helmet, CORS, rate limiting
- **Error Handling**: Global error handler with proper error types
- **Logging**: Structured logging with Pino
- **Docker**: Full Docker support with docker-compose
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

- Node.js 20+ 
- PostgreSQL 16+
- Redis 7+
- Docker & Docker Compose (optional)

## 🛠️ Setup

### 1. Clone and Install

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/motormint?schema=public

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_ACCESS_SECRET=your-super-secret-access-token-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key-change-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW=60000
```

**Important**: Change the JWT secrets in production!

### 3. Database Setup

#### Option A: Using Docker (Recommended for Development)

```bash
# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

#### Option B: Local PostgreSQL

1. Create a PostgreSQL database named `motormint`
2. Update `DATABASE_URL` in `.env`
3. Run migrations:
   ```bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   ```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (requires auth)

### Cars

- `GET /api/cars` - Get all cars (with filters and pagination)
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create car (Admin only)
- `PUT /api/cars/:id` - Update car (Admin only)
- `DELETE /api/cars/:id` - Delete car (Admin only)

**Query Parameters for GET /api/cars:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `brand` - Filter by brand
- `categoryId` - Filter by category
- `minYear` / `maxYear` - Filter by year range
- `minPrice` / `maxPrice` - Filter by price range
- `search` - Search in brand, model, description

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Car Stats

- `GET /api/stats/:carId` - Get stats for a car
- `POST /api/stats` - Create stats (Admin only)
- `PUT /api/stats/:carId` - Update stats (Admin only)
- `DELETE /api/stats/:carId` - Delete stats (Admin only)

### Favorites

- `GET /api/favorites` - Get user favorites (requires auth)
- `POST /api/favorites` - Add favorite (requires auth)
- `DELETE /api/favorites/:carId` - Remove favorite (requires auth)

### Health Check

- `GET /health` - Health check endpoint

## 🔐 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Example Request

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# Get cars
curl http://localhost:3000/api/cars

# Create car (Admin)
curl -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{
    "brand": "Tesla",
    "model": "Model 3",
    "year": 2024,
    "price": 39990
  }'
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker

### Development

```bash
# Start only database services
docker-compose -f docker-compose.dev.yml up -d

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop all services
docker-compose down
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Middleware functions
│   ├── repositories/    # Data access layer
│   ├── routes/          # Route definitions
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validations/     # Zod validation schemas
│   └── server.ts        # Main server file
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seed script
├── dist/                # Compiled JavaScript
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## 🗄️ Database Models

- **User**: Authentication and user data
- **Car**: Car listings
- **CarCategory**: Car categories
- **CarStats**: Performance statistics for cars
- **Favorite**: User favorites

## 🔒 Security Features

- Password hashing with Argon2
- JWT token authentication
- Role-based access control (ADMIN, USER)
- Rate limiting with Redis
- Helmet for security headers
- CORS configuration
- Input validation with Zod

## 📝 Default Users (from seed)

- **Admin**: `admin@motormint.com` / `admin123`
- **User**: `user@motormint.com` / `user123`

**⚠️ Change these passwords in production!**

## 🚨 Error Handling

The API uses a consistent error response format:

```json
{
  "success": false,
  "error": "Error message"
}
```

## 📊 Response Format

Success responses:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🛣️ Roadmap

- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add file upload support
- [ ] Add email notifications
- [ ] Add search with full-text search
- [ ] Add analytics endpoints

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

