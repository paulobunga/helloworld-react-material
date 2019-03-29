import * as PropTypes from 'prop-types';

export * from 'prop-types';

/**
 * General Purpose
 */

// export const { style } = ViewPropTypes;

/**
 * Routing
 */

const location = PropTypes.shape({
  hash: PropTypes.string.isRequired,
  key: PropTypes.string, // only in createBrowserHistory and createMemoryHistory
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  state: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.number, PropTypes.object, PropTypes.string]), // only in createBrowserHistory and createMemoryHistory
});

export const withRouting = {
  router: PropTypes.shape({
    match: PropTypes.shape({
      isExact: PropTypes.bool,
      params: PropTypes.object.isRequired,
      path: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    location: location.isRequired,
    history: PropTypes.shape({
      action: PropTypes.oneOf(['PUSH', 'REPLACE', 'POP']).isRequired,
      block: PropTypes.func.isRequired,
      canGo: PropTypes.func, // only in createMemoryHistory
      createHref: PropTypes.func.isRequired,
      entries: PropTypes.arrayOf(location), // only in createMemoryHistory
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      index: PropTypes.number, // only in createMemoryHistory
      length: PropTypes.number,
      listen: PropTypes.func.isRequired,
      location: location.isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
    }).isRequired,
  }),
};

/**
 * State Management
 */

export const withState = {
  dispatch: PropTypes.func.isRequired,
};

/**
 * Domain Entities
 */

export const User = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
});
