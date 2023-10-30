const { DataTypes } = require("sequelize");

const LayerModel = {
  layer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  layerGroup: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mapType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  markers: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("layer", LayerModel, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },

  createLayer: (layer) => {
    return this.model.create(layer);
  },

  findLayer: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateLayer: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllLayers: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteLayer: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
