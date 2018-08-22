# React Material Starter

A boilerplate and reference implementation for web applications built with React, Redux, and React Material.

## Preview

...

## References

- [Guidelines](https://github.com/emiketic/emiketic-docs/)
- [API Specifications/Documentation](https://starterspecapi.docs.apiary.io/)
- [Documentation](./docs)

## Technology

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [React Router](https://reacttraining.com/react-router)
- ...

## Requirements

- [Node.js v8+](https://nodejs.org/) + [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://www.npmjs.com/package/react-native-cli) (`npm -g install react-native-cli`)

## Usage

```sh
# install dependencies
yarn install

# run app in development on port 3000
yarn start

# run tests
yarn test

# build for production
yarn run build

# lint code for critical issues
yarn lint:critical

# lint code
yarn lint

# format code
yarn format
```

## Debugging

From DevTools

```javascript
// use logger
Logger.debug('Hello World!');

// check if there is an authenticated session
AuthService.isAuthenticated();

// get state from Redux store
$store.getState().MyModule.myField;

// dispatch action from Redux store
$store.dispatch($state.MyModule.$myAction(/* args */));
```
