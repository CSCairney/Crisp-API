
module.exports = {
    type: 'object',
    properties: {
      blog_id: {
        type: "string",
      },
      title: {
        type: 'string',
      },
      comments: {
          type: 'array',
      },
    additionalProperties: false
      },
      required: [
        'user_id',
        'title',
        'comments',
      ],
  };