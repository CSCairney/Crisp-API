module.exports = {
    type: 'object',
    properties: {
      layerGroup: {
        type: 'string',
        minLength: 1,
      },
      groupType: {
        type: 'string',
        minLength: 1,
      },
      mapType: {
        type: 'string',
        minLength: 1,
      },
      markers: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            markerName: {
              type: 'string',
            },
            coordinate: {
              type: 'object',
              properties: {
                lat: {
                  type: 'number',
                },
                long: {
                  type: 'number',
                },
              },
              required: ['lat', 'long'],
            },
            observations: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          required: ['markerName', 'coordinate', 'observations'],
        },
      },
    },
    additionalProperties: false,
  };
  