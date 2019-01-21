# Houston API

[![Maintainability](https://api.codeclimate.com/v1/badges/fa7e3822ab433568f524/maintainability)](https://codeclimate.com/github/astronomer/houston-api-2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fa7e3822ab433568f524/test_coverage)](https://codeclimate.com/github/astronomer/houston-api-2/test_coverage)

## Description

Houston is the command and control API for the [Astronomer Platform](https://github.com/astronomer/astronomer). It is primarily a [GraphQL](https://graphql.org) server built with [Apollo Server 2](https://www.apollographql.com) and [Prisma](https://www.prisma.io/docs/). It also supports several RESTful endpoints using the same express server that Apollo is using. These endpoints are primarily used for integrating with external authentication, docker registry and other external dependencies. This is the second iteration of this API. This version was built to support the same external API, and is just an internal
re-implementation.

## Database

Houston leverages [Prisma](https://www.prisma.io/docs/) as [GraphQL](https://graphql.org) backend on top of Postgres. The Prisma service sits between Houston and Postgres and exposes a secure CRUD API on top of the Datamodel defined in this project.

## Configuration

Houston can be configured via YAML files under `./config`, and can be overridden via environment variables, which are defined in `/config/custom-environment-variables.yaml`. To add or override any variables locally, create a `.env` file in the project directory.

## Structure

All source code is nested under `src`. This directory contains:

* [`lib`](https://github.com/astronomer/houston-api-2/tree/master/src/lib) contains all shared, library code. This directory is [listed as a root for the babel module loader](https://github.com/astronomer/houston-api-2/blob/master/.babelrc). All modules defined under this directory can be imported directly, rather than specifying a relative path.
* [`resolvers`](https://github.com/astronomer/houston-api-2/tree/master/src/resolvers) contains all the Queries, Mutations and Types for the GraphQL API.
* [`routes`](https://github.com/astronomer/houston-api-2/tree/master/src/routes) contains all RESTful route definitions.
* [`index.js`](https://github.com/astronomer/houston-api-2/blob/master/src/index.js) is the entrypoint for the application.
* [`schema.graphl`](https://github.com/astronomer/houston-api-2/blob/master/src/schema.graphql) contains the entire application schema.

## Authentication

Houston supports multiple authentication methods. Currently it supports the built-in username/password method, as well as Google OAuth, as well as Auth0 OAuth. By default, the local authentication method is enabled, as well as a default Auth0 account. This can be overridden with a custom configuration to override the [default values under the `auth` section](https://github.com/astronomer/houston-api-2/blob/master/config/default.yaml).

## Authorization

Houston currently defines several default role values in it's datamodel [here](https://github.com/astronomer/houston-api-2/blob/master/database/datamodel.graphql). These values are backed by a configurable permission mapping via a config file. The default permission mappings are defined [here](https://github.com/astronomer/houston-api-2/blob/master/config/default.yaml). These permissions are currently enforced using a [GraphQL
Directive](https://www.apollographql.com/docs/graphql-tools/schema-directives.html).

## Development

Houston is written in ES6 and beyond. It's currently built with [Babel](https://babeljs.io). Use `npm start` to run the API locally. This uses nodemon and will restart when any source files change. The only exception is `./database/datamodel.graphql`. Changes to this file requies you to restart, triggering a `prisma deploy` and `prisma generate`. We could probably automate that process on change as well.

The easiest way to run the project locally is to first run `docker-compose up`, or `docker-compose up -d` to detach and run the containers in the background, freeing up your terminal. This will start the postgres database, as well as the prisma service. From here you can run `npm start` to start the project locally, connecting to the previously started data stack. Houston could also be added to the docker-compose services, but it's easier to interpret the logs when it's on its own. Houston will start the [playground](https://github.com/prisma/graphql-playground) by default, but it's also possible to start a playground that will expose the application API, as well as the prisma API. To start this on port 3000, just run `graphql playground`, or send it to the background with `graphql playground &`.

## Testing

Houston is currently using [Jest](https://jestjs.io) for running tests. Typically test files will live near the unit being tested and be named similarly with `.unit.test.js` as its extension. Jest can be ran as a one-off or can be run in watch mode. Both modes allow you to specify a regex path to limit what tests are running. `npm run test` will run all tests once and report back. `npm run test -- src/resolvers/create-user --watch` will run in watch mode, and only for the tests for the `create-user` resolver.

## Useful Commands

* `npm start` starts the develpment server. Restarts automatically with nodemon.
* `npm run build` builds with babel and place output into `./dist`.
* `npm run serve` starts the production server from built files under `./dist`.
* `npm run test` runs tests using `jest`.
* `npm run test -- --watch` runs tests in watch mode.
* `npm run test -- src/resolvers/create-user --watch` runs a subset of tests in watch mode.
* `npm run coverage` runs tests and outputs a coverage report to `./coverage`.
* `npm run lint` runs eslint.
* `npm run playground` starts a single playground for application as well as prisma CRUD.
* `docker-compose up` starts a postgres container and the prisma service container.
