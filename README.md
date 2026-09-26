# Digital Card App

## Description

Digital Card App is a back-end application for creating and managing digital business cards.

The application is built with **Node.js**, **TypeScript**, **NestJS**, **PostgreSQL**, **Prisma**, and **GraphQL**.

## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **TypeScript**: Typed programming language used for the application source code.
- **NestJS**: Framework for building scalable Node.js server-side applications.
- **PostgreSQL**: Relational database management system.
- **Prisma**: ORM for database schema management, migrations, and database interaction.
- **GraphQL**: API query language and runtime.
- **Docker**: Container platform used to run the application.
- **Docker Compose**: Tool for defining and running the application and PostgreSQL database together.

## Features

- User registration and JWT authentication.
- Authenticated user information.
- Public digital card lookup by slug.
- Protected digital card management.
- Social link management.
- Ownership validation for protected operations.
- Input validation with class-validator.
- GraphQL API error handling.
- Prisma database migrations.
- Dockerized application and PostgreSQL database.

## Project Structure

```text
src/
├── auth/
├── users/
├── digital-cards/
├── social-links/
├── prisma/
└── types/

prisma/
└── migrations/

requests/
└── graphql-requests.http
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd digital-card-project
```

Install dependencies:

```bash
# development
$ npm ci
```

Generate Prisma Client:

```bash
$ npx prisma generate
```

## Environment

Create a local environment file:

```bash
$ cp .env.example .env
```

Fill in the required environment variables in `.env`.

Example:

```env
# APP
PORT=3001

# DB
DATABASE_URL="postgresql://postgres:password@localhost:5432/digital_card_project"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=digital_card_project

# JWT
JWT_TOKEN_SECRET=your-secret
JWT_TOKEN_ISSUER=digital-card-api
JWT_TOKEN_AUDIENCE=digital-card-client
JWT_ACCESS_TOKEN_TTL=3600
```

## Running the app

Run the application in development mode:

```bash
# development
$ npm run start:dev
```

The GraphQL API is available at:

```text
http://localhost:3001/graphql
```

## Database migrations

Apply existing Prisma migrations:

```bash
$ npx prisma migrate deploy
```

Create a new migration during development:

```bash
$ npx prisma migrate dev
```

Generate Prisma Client after schema changes:

```bash
$ npx prisma generate
```

## Build

Build the application:

```bash
$ npm run build
```

## Build and start Docker containers

Build and start the application and PostgreSQL containers:

```bash
$ docker compose up --build
```

The Docker setup starts:

- NestJS application;
- PostgreSQL database.

Prisma migrations are applied automatically when the application container starts.

The GraphQL API is available at:

```text
http://localhost:3001/graphql
```

Stop the containers:

```bash
$ docker compose down
```

PostgreSQL data is stored in the `db_data` Docker volume and persists between container restarts.

## Testing GraphQL Endpoints with HTTP Client

A `graphql-requests.http` file is included in the `requests` directory with ready-to-use GraphQL requests.

The file uses the JetBrains HTTP Client `GRAPHQL` request syntax and is compatible with WebStorm, IntelliJ IDEA, and other JetBrains IDEs that support HTTP Client requests.

The requests demonstrate:

- GraphQL queries and mutations;
- GraphQL variables;
- JWT authorization;
- digital card operations;
- social link operations.

### How to use

1. Open the `requests/graphql-requests.http` file.
2. Start the application locally or using Docker.
3. Set the `accessToken`, `cardId`, and `socialLinkId` variables where required.
4. Run the required request directly from the IDE.

Protected operations require a valid JWT in the `Authorization` header.

## Testing with Postman

The same GraphQL operations can be used in Postman.

Use:

```text
Method: POST
URL: http://localhost:3001/graphql
```

For the request headers:

```text
Content-Type: application/json
Authorization: Bearer <JWT>
```

The GraphQL request can be copied from the `requests/graphql-requests.http` file.

## GraphQL Operations

### Authentication

- `register`
- `login`
- `me`

### Digital Cards

- `createDigitalCard`
- `getMyDigitalCard`
- `getDigitalCard`
- `updateDigitalCard`
- `deleteDigitalCard`

### Social Links

- `addSocialLink`
- `updateSocialLink`
- `deleteSocialLink`
