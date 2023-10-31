const LayerModel = require("../../common/models/Layer");

module.exports = {
  newLayer: (req, res) => {
    const payload = req.body;
    console.log("Received new layer request with payload:", payload);

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
        console.error("Error occurred during new layer generation: ", err);
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getLayer: (req, res) => {
    const {
      params: { layerId },
    } = req;

    LayerModel.findLayer({ layer_id: layerId })
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
        console.error(err)
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
