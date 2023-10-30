
module.exports = {
  type: 'object',
  properties: {
    user_id: {
      type: 'number',
      notNull: true,
    },
    title: {
      type: 'string',
      notNull: true,
    },
    content: {
        type: 'string',
        notNull: true,
    },
  additionalProperties: false
    },
    required: [
      'title',
      'content'
    ],
};