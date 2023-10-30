
module.exports = {
  type: 'object',
  properties: {
    user_id: {
      type: 'number',
    },
    title: {
      type: 'string',
    },
    content: {
        type: 'string',
    },
    rating: {
        type: 'number',
    },
  additionalProperties: false
    },
    required: [
      'user_id',
      'title',
      'content',
      'rating'
    ],
};