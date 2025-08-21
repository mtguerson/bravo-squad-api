# Bravo Squad API

A TypeScript-based REST API built with Fastify that serves as a middleware for player analytics and statistics management. The API integrates with the VTurb analytics service and provides endpoints for player management and statistical data retrieval.

## 🚀 Features

- **Player Management**: Create and list players with unique identifiers
- **Analytics Integration**: Fetch comprehensive statistics from VTurb API
- **Time-based Analytics**: Retrieve statistics by date ranges and daily breakdowns
- **Live User Tracking**: Monitor real-time user activity across domains
- **Type-safe**: Built with TypeScript and Zod validation
- **Database Integration**: PostgreSQL with Drizzle ORM
- **CORS Support**: Configured for web application integration

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Type Safety**: fastify-type-provider-zod
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm
- Docker and Docker Compose (for database)
- VTurb API credentials

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bravo-squad-api
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VTURB_API_URL=https://api.vturb.com
   VTURB_API_TOKEN=your_vturb_api_token
   PORT=3333
   DATABASE_URL=postgresql://docker:docker@localhost:5432/bravo-analytics-db
   ```

4. **Start the database**

   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**
   ```bash
   pnpm drizzle-kit push
   ```

## 🚀 Running the Application

### Development Mode

```bash
pnpm dev
```

### Production Mode

```bash
pnpm start
```

The server will start on `http://localhost:3333` (or the port specified in your environment variables).

## 📡 API Endpoints

### Player Management

#### Create Player

```http
POST /create-player
Content-Type: application/json

{
  "id": "player-123",
  "name": "Player Name"
}
```

#### List Players

```http
GET /list-players
```

### Analytics & Statistics

#### Get All Statistics

```http
POST /list-all-stats
Content-Type: application/json

{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "playerId": "player-123"
}
```

#### Get Daily Statistics

```http
POST /list-all-stats-by-day
Content-Type: application/json

{
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "playerId": "player-123"
}
```

#### Get Live Domains

```http
GET /list-domains/:playerId
```

## 🗃️ Database Schema

### Players Table

```sql
CREATE TABLE players (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 🔒 Environment Variables

| Variable          | Description                    | Required | Default |
| ----------------- | ------------------------------ | -------- | ------- |
| `VTURB_API_URL`   | VTurb API base URL             | ✅       | -       |
| `VTURB_API_TOKEN` | VTurb API authentication token | ✅       | -       |
| `PORT`            | Server port                    | ❌       | 3333    |
| `DATABASE_URL`    | PostgreSQL connection string   | ✅       | -       |

## 🐳 Docker Support

The project includes a `docker-compose.yaml` file for easy database setup:

```bash
# Start PostgreSQL database
docker-compose up -d

# Stop database
docker-compose down
```

## 🔧 Development

### Project Structure

```
src/
├── db/
│   ├── index.ts          # Database connection
│   └── schema.ts         # Database schema definitions
├── routes/
│   ├── create-player.ts
│   ├── list-players.ts
│   ├── list-all-stats.ts
│   ├── list-all-stats-by-day.ts
│   └── list-domains.ts
├── env.ts                # Environment variables validation
└── index.ts              # Application entry point
```

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm start` - Start production server
- `pnpm drizzle-kit push` - Push database schema changes
- `pnpm drizzle-kit studio` - Open Drizzle Studio (database GUI)

## 🌐 CORS Configuration

The API is configured to accept requests from:

- `http://localhost:5173` (local development)
- `https://bravo-squad-dash.vercel.app` (production dashboard)

## 🤝 Integration

This API serves as a backend for the Bravo Squad Dashboard application, providing:

- Player data management
- Analytics data aggregation
- Real-time user statistics
- Cross-domain activity monitoring

## 📝 API Response Format

All endpoints return JSON responses with appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

## 🔍 Error Handling

The API includes built-in error handling for:

- Invalid request payloads (Zod validation)
- Duplicate player creation attempts
- External API communication errors
- Database connection issues

## 📊 Monitoring

The application includes:

- Structured logging with Fastify's built-in logger
- Request/response logging
- Error tracking and reporting

## 🚦 Health Check

The server logs startup confirmation and is ready to handle requests once you see:

```
Server is running on port 3333
```

## 📄 License

This project is licensed under the ISC License.
