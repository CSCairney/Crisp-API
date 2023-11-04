const LayerModel = require("../../common/models/Layer");

module.exports = {
  newLayer: (req, res) => {
    const payload = req.body;

    LayerModel.createLayer(payload)
      .then((layer) => {
        return res.status(200).json({
          status: true,
          data: {
            layer: layer.toJSON(),
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // getLayer: (req, res) => {
  //   const {
  //     params: { layerId },
  //   } = req;

  //   LayerModel.findLayer({ layer_id: layerId })
  //     .then((layer) => {
  //       return res.status(200).json({
  //         status: true,
  //         data: layer.toJSON(),
  //       });
  //     })
  //     .catch((err) => {
  //       return res.status(500).json({
  //         status: false,
  //         error: err,
  //       });
  //     });
  // },

  updateLayer: (req, res) => {
    const {
      params: { layerId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the layer.",
        },
      });
    }

    LayerModel.updateLayer({ layer_id: layerId }, payload)
      .then(() => {
        return LayerModel.findLayer({ layer_id: layerId });
      })
      .then((layer) => {
        return res.status(200).json({
          status: true,
          data: layer.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteLayer: (req, res) => {
    const {
      params: { layerId },
    } = req;

    LayerModel.deleteLayer({ layer_id: layerId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfLayersDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllLayers: (req, res) => {
    LayerModel.findAllLayers(req.query)
      .then((layers) => {
        return res.status(200).json({
          status: true,
          data: layers,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getLayerByName: (req, res) => {
    const {
      params: { layer },
    } = req;
  
    LayerModel.findLayer({ layer: layer }) // Assuming the field name in the database is `layer_name`
      .then((layer) => {
        if (!layer) {
          return res.status(404).json({
            status: false,
            error: {
              message: "Layer not found.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          data: layer.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getLayerNames: async (req, res) => {
    try {
      const layers = await LayerModel.findAllLayers(); // Assuming findAllLayers retrieves all columns
      const simplifiedLayers = layers.map((layer) => {
        const { details, ...rest } = layer.toJSON(); // Exclude 'details' property
        return rest;
      });
      return res.status(200).json({
        status: true,
        data: simplifiedLayers,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        status: false,
        error: err.message,
      });
    }
  }  
};
