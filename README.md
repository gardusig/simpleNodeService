## Introduction

Node.js project designed for building scalable and modular server-side applications using NestJS.

1. [Local Development](#local-development)
2. [Docker usage](#docker-usage)
3. [End to end integration tests](#end-to-end-integration-tests)
4. [Database Management](#database-management)

## Local Development

To run locally, ensure that Node.js and npm are installed on your machine. If not installed, follow the official installation guide for [Node.js](https://nodejs.org/) to get started.

### Installation

From the project's root directory, navigate to the `app/` folder and install the required dependencies using:

```bash
$ cd app
$ npm install
```

### Build

Use the following command to build the project:

```bash
$ npm run build
```

### Start Server Locally

Make sure you have a database ready to serve before starting the server. To start the server locally, use:

```bash
$ npm run start
```

### Lint

Run ESLint to lint your TypeScript code:

```bash
$ npm run lint
```

### Format

Format your code:

```bash
$ npm run format
```

### Database Connection

To successfully create a connection to the PostgreSQL you need to create a **.env** file with a `${DATABASE_URL}` inside the `app/prisma/` folder. The format of the url string is: 
- `postgres://[username]:[password]@[host]:[port]/[database_name]`

## Docker Usage

Docker is utilized for containerized deployment, making it easy to manage dependencies and ensure consistent environments.

For Docker-based deployment, make sure Docker and Docker Compose are installed on your machine. If not installed, follow the official installation guides for [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Build

Use the following command to build the project:

```bash
$ docker-compose build
```

### Start Database locally

```bash
$ docker-compose up --detach db
```

The database will be listening for at port `5432` within the container network. For outside connections, it will listen at port `2345`, you must refer to it as `localhost:2345`, example:

| NAME            | IMAGE    | COMMAND              | SERVICE | CREATED    | STATUS       | PORTS                  |
| --------------- | -------- | -------------------- | ------- | ---------- | ------------ | ---------------------- |
| nodenestjs-db-1 | postgres | docker-entrypoint.s… | db      | 4 days ago | Up 4 minutes | 0.0.0.0:2345->5432/tcp |


### Start Server Locally

To start the servers and the load balancer

```bash
$ docker-compose up --detach server_0 server_1 server_2
$ docker-compose up --detach nginx
```

Each server will be listening for at the port `${SERVER_*_PORT}` within the container network. 

You don't access the server directly, but through nginx, with a self signed certificate. For outside connections, you must refer to it as `https://localhost:${NGINX_EXPOSED_PORT}`, example:

| NAME                  | IMAGE               | COMMAND              | SERVICE  | CREATED        | STATUS        | PORTS                         |
| --------------------- | ------------------- | -------------------- | -------- | -------------- | ------------- | ----------------------------- |
| nodenestjs-server_0-1 | nodenestjs-server_0 | docker-entrypoint.s… | server_0 | 40 minutes ago | Up 40 minutes |                               |
| nodenestjs-server_1-1 | nodenestjs-server_1 | docker-entrypoint.s… | server_1 | 40 minutes ago | Up 40 minutes |                               |
| nodenestjs-server_2-1 | nodenestjs-server_2 | docker-entrypoint.s… | server_2 | 40 minutes ago | Up 40 minutes |                               |
| nodenestjs-nginx-1    | nodenestjs-nginx    | /docker-entrypoint.… | nginx    | 40 minutes ago | Up 40 minutes | 80/tcp, 0.0.0.0:3000->443/tcp |

Once the server is running, you can access the Swagger documentation by navigating to `https://localhost:3000/docs` in your web browser.


For logs output, you can use this command:

```bash
$ docker-compose logs -f server_0
$ docker-compose logs -f server_1
$ docker-compose logs -f server_2
```

### Stopping Services

To stop the running services and release resources, use the following command:

```bash
$ docker-compose down
```

## End to end integration tests

The main goal of this test suite is to setup all containers and make sure things are working fine at a close to production environment.

### Run

Use the following command to run end to end integration tests:

```bash
$ docker-compose run e2e
```

### Development

From the project's root directory, navigate to the `app` folder and run tests using:

```bash
$ cd app
$ npm run test
```

### Pipeline

In order to replicate the pipeline, you can run these commands:

#### Cleanup

```bash
$ ./script/pipeline/run.sh cleanup
```

#### Lint

```bash
$ ./script/pipeline/run.sh lint
```

#### Start

```bash
$ ./script/pipeline/run.sh start
```

#### Test

```bash
$ ./script/pipeline/run.sh test
```

## Database Management

Server relies on a database to store application data. To manage the database schema and data, we use Prisma Migrate for database migrations and Prisma Client for database interactions.

### Database Migrations

Database migrations are essential for managing changes to the database schema over time. Whenever there are changes to the schema, such as adding new tables or modifying existing ones, it's crucial to create and apply migrations to keep the database schema in sync with the application's requirements.

#### Running Migrations

To run database migrations, use the following command:

```bash
$ cd app
$ npm run prisma:migrate
```

This command applies any pending migrations to the database. It's recommended to run migrations whenever there are changes to the database schema.
