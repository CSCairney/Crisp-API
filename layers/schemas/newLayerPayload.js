module.exports = {
    type: 'object',
    properties: {
      layerGroup: {
        type: 'string',
      },
      groupType: {
        type: 'string',
      },
      mapType: {
        type: 'string',
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
    required: ['layerGroup', 'markers'],
    additionalProperties: false,
  };
  