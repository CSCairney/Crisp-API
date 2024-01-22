
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
    upcote_counter: {
        type: 'number',
    },
    tags: {
      type: 'array',
    },
    comments: {
      type: 'array',
    },
  additionalProperties: false
    },
    required: [
      'user_id',
      'title',
      'content',
      'rating',
      'upcote_counter',
      'tags',
      'comments',
    ],
};