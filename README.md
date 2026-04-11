# clearbooks-server

Express + TypeScript REST API server.

## Requirements

- Node.js 20+
- Docker & Docker Compose

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the example env file and fill in your values:
   ```bash
   cp .env.example .env.development
   ```

3. Start the server with hot reload:
   ```bash
   npm run dev
   ```

## Running with Docker

1. Copy the example env file and fill in your values:
   ```bash
   cp .env.example .env.production
   ```

2. Build and start all services (API + Postgres):
   ```bash
   docker compose up --build
   ```

3. Run in background:
   ```bash
   docker compose up --build -d
   ```

4. Stop all services:
   ```bash
   docker compose down
   ```

5. Stop and remove all data (including the database volume):
   ```bash
   docker compose down -v
   ```

## Database Migrations

Run migrations against a running database:

```bash
# locally
npm run migrate

# inside the running api container
docker compose exec api node dist/db/migrate.js
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output |
| `npm run migrate` | Run database migrations |
| `npm run lint` | Check for lint errors |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check formatting without writing |
