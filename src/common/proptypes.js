import * as PropTypes from 'prop-types';

export * from 'prop-types';

/**
 * General Purpose
 */

// export const { style } = ViewPropTypes;

/**
 * react-router
 */

export const router = PropTypes.shape({
  // ...
});

/**
 * react-redux
 */

export const dispatch = PropTypes.func;

/**
 * Domain Entities
 */

export const User = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  email: PropTypes.string,
});
