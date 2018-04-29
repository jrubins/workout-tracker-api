# Workout Tracker API

This is the API for the workout tracker.

## Development environment setup

#### Install MongoDB

The Workout Tracker API uses MongoDB as its database. Check out the [documentation](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/#install-mongodb-community-edition-with-homebrew) for instructions on installing MongoDB. We suggest installing it via Homebrew.

#### Install Node.js and NPM

Node.js should be installed using [NVM](https://github.com/creationix/nvm). NVM is a Node.js version manager and allows you to easily install, switch between and uninstall different Node versions. The currently used version of Node.js can be found in our `package.json` file.

#### Install Yarn

[Yarn](https://yarnpkg.com/) is a much faster dependency manager than NPM created by Facebook.

**We don't recommend installing Yarn via Homebrew as it will also install Node.js if you don't yet have it and you may run into conflicts with what we install via NVM.**

Install Yarn using the following command:

```
npm -g install yarn
```

After installing Yarn, run the command:

```
which yarn
```

You should see output like the following:

```
/Users/{yourUser}/.nvm/versions/node/v6.9.2/bin/yarn
```

#### Starting the application

In order to start the application, we need to install our NPM dependencies, build our assets, start our DB and start a local development server:

```
yarn start
```

This installs the dependencies from our `package.json` file, builds the app and starts a development server at [http://localhost:5000](http://localhost:5000). Our application uses nodemon for server restarting so any changes made to the application files will result in the server being restarted.

This also starts our database. You should see output like the following to indicate the DB is ready for connections:

```
2017-05-01T15:49:07.568-0500 I NETWORK  [thread1] waiting for connections on port 27018
```

#### Environment variables

Our environment variables are set up in the `.env` file. These contain common environment variable values for the application, third parties, etc.

#### Linting

This project has a set of ESLint rules. To run the linter, run the following command:

```
yarn lint
```

The "lint" task is defined in our `package.json` file. It is also run before a commit is allowed.
