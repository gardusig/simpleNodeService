## Introduction

Node.js project designed for building scalable and modular server-side applications using NestJS.

1. [Local Development](#local-development)
2. [Docker usage](#docker-usage)
3. [End to end integration tests](#end-to-end-integration-tests)
4. [PgAdmin](#using-pgadmin-to-access-the-postgresql-server)
5. [Database Management](#database-management)

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

The database will be listening for the `${DB_INTERNAL_PORT}` within the container network. For outside connections, you must refer to it as `localhost:${DB_EXPOSED_PORT}`, example:

| NAME            | IMAGE    | COMMAND              | SERVICE | CREATED    | STATUS       | PORTS                  |
| --------------- | -------- | -------------------- | ------- | ---------- | ------------ | ---------------------- |
| backoffice-db-1 | postgres | docker-entrypoint.s… | db      | 4 days ago | Up 4 minutes | 0.0.0.0:2345->5432/tcp |


### Start Server Locally

To start the server and database locally, use:

```bash
$ docker-compose up --detach server
```

The server will be listening for the `${SERVER_INTERNAL_PORT}` within the container network. For outside connections, you must refer to it as `localhost:${SERVER_EXPOSED_PORT}`, example:

| NAME                | IMAGE             | COMMAND              | SERVICE | CREATED       | STATUS      | PORTS                            |
| ------------------- | ----------------- | -------------------- | ------- | ------------- | ----------- | -------------------------------- |
| backoffice-server-1 | backoffice-server | docker-entrypoint.s… | server  | 2 seconds ago | Up 1 second | 3000/tcp, 0.0.0.0:3000->6969/tcp |

Once the server is running, you can access the Swagger documentation by navigating to `http://localhost:3000/docs` in your web browser.


For logs output, you can use this command:

```bash
$ docker-compose logs -f server
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

From the project's root directory, navigate to the e2e folder and install the required dependencies using:

```bash
$ cd e2e
$ npm install
```

Run tests

```bash
$ npm run test
```

## Using pgAdmin to access the PostgreSQL server

With PostgreSQL container running, you can use pgAdmin to manage PostgreSQL databases in a more friendly interface.

### Install

You can download pgAdmin [here](https://www.pgadmin.org/download/). Or use it from the docker-compose by running:

```bash
$ docker-compose up --detach pgadmin
```

You can access the UI from: http://0.0.0.0:420/

### Setup Guide

First you need to create a server object in pgAdmin with the details of the PostgreSQL container. To do that, just follow these steps:

1. Open pgAdmin and log in with credentials from [.env](./.env):
   - `PGADMIN_DEFAULT_EMAIL`: admin@example.com
   - `PGADMIN_DEFAULT_PASSWORD`: admin
2. In the left, right-click the `Servers` item, then select `Register` -> `Server`
3. A new window will pop up. In the `General` tab, give the server a name of your choice
4. In the `Connection` tab, input the following from [.env](./.env):
   * `Host name/address`: db
   * `Port`: 5432
   * `Maintenance database`: postgres
   * `Username`: postgres
   * `Password`: postgres
5. Click `Save`

Now you should be able to see the server created. You can expand the server to see databases and other objects within it.

## Database Management

Server relies on a database to store application data. To manage the database schema and data, we use Prisma Migrate for database migrations and Prisma Client for database interactions.

### Database Migrations

Database migrations are essential for managing changes to the database schema over time. Whenever there are changes to the schema, such as adding new tables or modifying existing ones, it's crucial to create and apply migrations to keep the database schema in sync with the application's requirements.

#### Running Migrations

To run database migrations, use the following command:

```bash
$ npm run prisma:migrate
```

This command applies any pending migrations to the database. It's recommended to run migrations whenever there are changes to the database schema.
