const { DataTypes } = require("sequelize");

const BlogModel = {
  blog_id: {
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
  user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
   },
   rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
   },
   upvote_counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        defaultValue: 0,
   },
    tags: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
          unique: false,
    },
    comments: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          unique: false,
    },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("blog", BlogModel, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    });
  },

  createBlog: (blog) => {
    return this.model.create(blog);
  },

  findBlog: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateBlog: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllBlogs: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  findAllBlogsByUser: (query) => {
    return this.model.findAll({
      where: query
    });
  },

  deleteBlogsByUser: (query) => {
    return this.model.destroy({
      where: query
    });
  },

  deleteBlogsById: (query) => {
    return this.model.destroy({
      where: query
    });
  },

  updateRatingById: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  updateTagsById: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  updateCommentsById: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  }
  }
