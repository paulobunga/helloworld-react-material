# React Starter

A boilerplate and reference implementation for web applications built with React, Redux, and React Material.

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

## Usage

```sh
# install dependencies
npm install

# run app in development on port 3000
npm start

# run tests
npm run test

# build for production
npm run run build

# lint code for critical issues
npm run lint:critical

# lint code
npm run lint

# format code
npm run format
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
