
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
    upvote_counter: {
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
      'upvote_counter',
      'tags',
      'comments',
    ],
};