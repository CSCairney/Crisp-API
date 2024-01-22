
module.exports = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      content: {
          type: 'string',
      },
    additionalProperties: false
      },
      required: [
        'title',
        'content',
      ],
  };