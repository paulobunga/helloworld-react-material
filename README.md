# React.js Starter

...

## Requirements

- Node.js v8

## Usage

```sh
# install dependencies
yarn install

# run app in development on port 3000
yarn start

# lint
yarn run lint

# format
yarn run format

# run all tests
yarn test

# build for production
yarn run build
```

## Debugging

From DevTools

```javascript
// use logger
Logger.debug('Hello World!');

// check if there is an authenticated session
$auth.isAuthenticated();

// get state from Redux store
$store.getState().MyModule.myField;

// dispatch action from Redux store
$store.dispatch($state.MyModule.$myAction(/* args */));
```

## Ressources

- Libraries
  - [React.js](https://reactjs.org)
  - [React Router](https://reacttraining.com/react-router)
  - [Redux](https://redux.js.org)
