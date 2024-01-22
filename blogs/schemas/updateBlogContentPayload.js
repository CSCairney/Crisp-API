
module.exports = {
    type: 'object',
    properties: {
      id: {
        type: "string",
      },
      title: {
        type: 'string',
      },
      content: {
          type: 'string',
      },
    additionalProperties: false
      },
      required: [
        'user_id',
        'title',
        'content',
      ],
  };