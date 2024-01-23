# App

## Introduction

Node.js project designed for building scalable and modular server-side applications using NestJS.

## Local Development

To run locally, ensure that Node.js and npm are installed on your machine. If not installed, follow the official installation guide for [Node.js](https://nodejs.org/) to get started.

### Installation

Navigate to the project's root directory and install the required dependencies using:

```bash
$ npm install
```

### Build

Use the following command to build the project:

```bash
$ npm run build
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

### Start Server Locally

To start the server locally, use:

```bash
$ npm run start:dev
```

Once the server is running, you can access the Swagger documentation by navigating to `http://localhost:3000/docs` in your web browser.

## Docker Usage

Docker is utilized for containerized deployment, making it easy to manage dependencies and ensure consistent environments.

For Docker-based deployment, make sure Docker and Docker Compose are installed on your machine. If not installed, follow the official installation guides for [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Build

Use the following command to build the project:

```bash
$ docker-compose build
```

### Lint

Run ESLint to check your TypeScript code:

```bash
$ docker-compose run server-lint
```

### Start Server Locally

To start the server and database locally, use:

```bash
$ docker-compose up --detach server
```

### Stopping Services

To stop the running services and release resources, use the following command:

```bash
$ docker-compose down
```

## Usage

After starting the services, you can interact with the server. For example, you can use cURL to create a new `random_object`:

```bash
$ curl -X POST \
  http://localhost:3000/api/random_object/register \
  -H 'Content-Type: application/json' \
  -d '{
    "charField": "example",
    "booleanField": true,
    "intField": 42
  }'
```

## Configuration 

<!-- TODO -->

## End to end integration tests

The main goal of this test suite is to setup all containers and make sure things are working fine at a close to production environment.

### Run

Use the following command to run end to end integration tests:

```bash
$ docker-compose run e2e
```

## Configuration 

<!-- TODO -->

## End to end integration tests

The main goal of this test suite is to setup all containers and make sure things are working fine at a close to production environment.

### Run

Use the following command to run end to end integration tests:

```bash
$ docker-compose run e2e
```

## Using pgAdmin to access the PostgreSQL server

With PostgreSQL container running, you can use pgAdmin to manage PostgreSQL databases in a more friendly interface. You can download pgAdmin [here](https://www.pgadmin.org/download/). First you need to create a server object in pgAdmin with the details of the PostgreSQL container. To do that, just follow these steps:

  1. Open pgAdmin
  2. In the left, right-click the `Servers` item, then select `Register` -> `Server`
  3. A new window will pop up. In the `General` tab, give the server a name of your choice
  4. In the `Connection` tab, input the following:
      * `Host name/address`: localhost
      * `Port`: 5400 (or look up in the `docker-compose.yml` file for the host port of the PostgreSQL container)
      * `Maintenance database`: postgres
      * `Username`: postgres (or look up in the `docker-compose.yml` file for the credentials of the PostgreSQL container)
      * `Password`: postgres
  5. Click `Save`.

Now you should be able to see the server created. You can expand the server to see databases and other objects within it.