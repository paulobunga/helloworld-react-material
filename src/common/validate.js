export * from 'helloworld-lib/src/common/validate';

export function exec(value, rules) {
  let _error = [];
  rules.forEach((rule) => {
    if (rule(value) === true) {
      return;
    }
    _error = [..._error, rule(value)];
  });
  return _error.length ? _error : null;
}

export const PASSWORD_LENGTH = 8;
export const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const required = (value) => !!value || 'Required.';

export const password = (value) => value.length >= PASSWORD_LENGTH || `Min ${PASSWORD_LENGTH} characters`;

export const email = (value) => {
  return EMAIL_PATTERN.test(value) || 'Invalid email.';
};

export const username = email;
