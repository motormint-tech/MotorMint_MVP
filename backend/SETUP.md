# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment

Create a `.env` file (see `ENV_EXAMPLE.md` for template):

```bash
# Copy the example and fill in your values
cp ENV_EXAMPLE.md .env
# Edit .env with your actual values
```

**Required minimum values:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_ACCESS_SECRET` - At least 32 characters
- `JWT_REFRESH_SECRET` - At least 32 characters

## 3. Start Database Services (Docker)

```bash
# Start PostgreSQL and Redis
docker-compose -f docker-compose.dev.yml up -d

# Verify they're running
docker-compose -f docker-compose.dev.yml ps
```

## 4. Set Up Database

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed
```

## 5. Start Development Server

```bash
npm run dev
```

Server will be available at `http://localhost:3000`

## 6. Test the API

```bash
# Health check
curl http://localhost:3000/health

# Register a user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker-compose -f docker-compose.dev.yml ps`
- Check DATABASE_URL in `.env` matches your setup
- Try: `docker-compose -f docker-compose.dev.yml restart postgres`

### Redis Connection Issues
- Ensure Redis is running: `docker-compose -f docker-compose.dev.yml ps`
- Check REDIS_HOST and REDIS_PORT in `.env`
- Try: `docker-compose -f docker-compose.dev.yml restart redis`

### Port Already in Use
- Change PORT in `.env` to a different port (e.g., 3001)
- Or stop the process using port 3000

### Prisma Issues
- Run `npm run db:generate` after schema changes
- Run `npm run db:migrate` to apply migrations
- Check `prisma/schema.prisma` for syntax errors

