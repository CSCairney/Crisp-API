const { roles } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    first_name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: Object.values(roles)
    }
  },
  required: [
    'username',
    'email',
    'password',
    'age',
    'first_name',
    'last_name'
  ],
  additionalProperties: false
};
