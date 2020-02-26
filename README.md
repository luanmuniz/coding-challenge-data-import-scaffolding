
# What is this

This is a scaffolding for you to get started quickly on Portchain's coding challenge.
It is built with the following technologies in mind:
- Sequelize connected to PostgreSQL
- NodeJS + Typescript on the backend
- React + Typescript on the front-end
- *Easy and fast deployment to Heroku*



# Tests

The tests only cover the merging algorithm


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
