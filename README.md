
# What is this

This is a scaffolding for you to get started quickly on Portchain's coding challenge.
It is built with the following technologies in mind:
- Sequelize connected to PostgreSQL
- NodeJS + Typescript on the backend
- React + Typescript on the front-end
- *Easy and fast deployment to Heroku*

# Getting started

## Setup the working environment

1. Clone this repo on your local machine
2. Run `npm install`
3. Setup a PostgreSQL database. You can also ask for a cloud instance and we will provide you with one. 
4. Configure the env variable `DATABASE_URL` and point it to your database
5. Run `npm build && npm start`
6. Navigate to `http://localhost:3000` and verify that the scaffolding application is running (there should be vessels visible)

## Implement

There are 2 parts that you need to implement:

1. The merging algorithm to import the vessel schedules
  - You can rely on the existing tests that cover some basic scenarios. See [below](#Tests) on how to run the tests.
2. The User Interface. You need to display two additional pages:
  a. The list of port calls for a given vessel
  b. The history of each port call

# Tests

There are some existing tests that will get you started in building the merging algorithm.
These tests consist in fixtures describing 2 inputs and and an expected output:
- The schedules as they currently are in the database (input)
- The schedules as they currently are in the provider API (input)
- A list of 'actions' that the merge algorithm should generate. See the API of the merge algorithm for more detailed information in [vessel-schedule-merger.ts](https://github.com/Portchain/coding-challenge-data-import-scaffolding/blob/master/src/server/import-service/vessel-schedule-merger.ts)


run the following to run all tests:

```sh
npm test
```

Run the following to run a single fixture:

```sh
TEST_FIXTURE=008 npm test
```

The `TEST_FIXTURE` environment variable is evaluated as a regular expression so you can be creative in the use of this variable.
For example:
```
TEST_FIXTURE=(007|008) npm test
```


# Running

- `PORT` The HTTP port the server will listen to.
- `DATABASE_URL` The URL of the database that sequelize will use to connect