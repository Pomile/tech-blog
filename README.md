# Tech Blog Backend

This application gives engineer the opportunity to write and tell stories of pratical solution to problems.

## Prerequisites

* Node
* MongoDB
* Vscode

## Run the application

Follow the steps below to run the application

1. Clone the project from the repository
2. Change directory to project root
3. Run npm install
4. Start the app

To start the app in development environment

```$ npm run dev```

To start the app in staging or production

```$ npm start```

***Example**

> git clone <https://repo.git>
> cd repo
> npm install
> npm run dev

## Environments

This section describes the environments you should have, at a minimum. It might sound like a lot, [but there is a purpose for each one](http://futurice.com/blog/five-environments-you-cannot-develop-without).

* [Local development](#local-development-environment)
* [Continuous integration](#continuous-integration-environment)
* [Testing](#testing-environment)
* [Staging](#staging-environment)
* [Production](#production-environment)

### Local development environment

In your local development environment. you should run the entire system locally, by stubbing or mocking third-party services as needed.

### Continuous integration environment

CI is (among other things) for making sure that your software builds and automated tests pass after every change.

### Testing environment

#### Run integration Test

Below, we have an **aggregate test script**. It runs the test script from all  the modules.

``` $ npm test ```

#### Run unit Test

Each module has its own test script. To Run a test script. Follow the example below

``` $ npm run unit:test **/user.spec.js ```

## Tools

* Express
* Express Validator
* Mongoose
* Travis
* Code Coverage

## Documentation
