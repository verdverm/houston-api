# Houston API

## Description

Houston is the command and control API for the Astronomer Platform. It is primarily a GraphQL server built with `apollo-server2` and `prisma`. It also supports several RESTful endpoints using the same express server that apollo is using. These endpoints are primarily used for integrating with external authentication, docker registry and other external dependencies. This is the second iteration of this API. This version was built to support the same external API, and is just an internal
re-implementation.

## Database

Houston leverages Prisma as GraphQL backend on top of Postgres.

## Configuration

Houston can be configured via YAML files under `./config`, and can be overridden via environment variables, which are defined in `/config/custom-environment-variables.yaml`. To add or override any variables locally, create a `.env` file in the project directory.

## Development

Houston is written in es6 and beyond. It's currently built with babel. It's also using a module plugin so imports can be written relative to `./src` and avoid imports like `../../my-module`.

## Commands

* `npm start` - Start the develpment server. Restarts automatically with nodemon.
* `npm run test` - Runs tests using `jest`.
* `npm run test -- --watch` - Runs tests in watch mode.
* `npm run build` -- Build with babel and place output into `./dist`.
* `npm run playground` - Start a single playground for application as well as prisma CRUD.
