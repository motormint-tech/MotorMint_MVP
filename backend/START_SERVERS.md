# Starting Backend and Frontend

## Prerequisites

Before starting the servers, you need:

1. **PostgreSQL** running on `localhost:5432`
   - Database: `motormint`
   - User: `postgres`
   - Password: `postgres`

2. **Redis** running on `localhost:6379`

### Option 1: Using Docker (Recommended)

If you have Docker installed:

```bash
cd backend
docker compose -f docker-compose.dev.yml up -d
```

This will start PostgreSQL and Redis in containers.

### Option 2: Local Installation

Install and run PostgreSQL and Redis locally on your machine.

## Starting the Servers

### Terminal 1 - Backend

```bash
cd backend
npm install
npm run db:generate
npm run db:migrate
npm run db:seed  # Optional: seed with sample data
npm run dev
```

Backend will run on: `http://localhost:3000`

### Terminal 2 - Frontend

```bash
# From project root
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Quick Start Script

If you have both PostgreSQL and Redis running, you can use:

**Windows PowerShell:**
```powershell
# Terminal 1 - Backend
cd backend; npm run dev

# Terminal 2 - Frontend  
npm run dev
```

**Linux/Mac:**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

## Troubleshooting

### Backend won't start

1. **Database connection error:**
   - Ensure PostgreSQL is running
   - Check `DATABASE_URL` in `backend/.env`
   - Try: `npm run db:push` instead of `db:migrate`

2. **Redis connection error:**
   - Ensure Redis is running
   - Check `REDIS_HOST` and `REDIS_PORT` in `backend/.env`
   - Backend will work without Redis but caching won't function

3. **Prisma errors:**
   - Run: `npm run db:generate`
   - If locked, close any Prisma Studio instances

### Frontend won't start

1. Check if port 5173 is already in use
2. Try: `npm install` to ensure dependencies are installed
3. Check for TypeScript errors

## Environment Variables

Make sure `backend/.env` exists with:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/motormint?schema=public
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_ACCESS_SECRET=your-secret-min-32-chars
JWT_REFRESH_SECRET=your-secret-min-32-chars
```

## Testing the API

Once backend is running:

```bash
# Health check
curl http://localhost:3000/health

# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

