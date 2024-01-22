
module.exports = {
    type: 'object',
    properties: {
      blog_id: {
        type: "string",
      },
      title: {
        type: 'string',
      },
      upvote_counter: {
          type: 'number',
      },
    additionalProperties: false
      },
      required: [
        'user_id',
        'title',
        'upvote_counter',
      ],
  };