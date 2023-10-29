const { DataTypes } = require("sequelize");

const BlogModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
   },
   rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
   },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("blog", UserModel);
  },

  createBlog: (blog) => {
    return this.model.create(blog);
  },

  findBlog: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateUser: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllUsers: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteUser: (query) => {
    return this.model.destroy({
      where: query
    });
  }
};
