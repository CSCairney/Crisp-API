const BlogModel = require("../../common/models/Blog");

module.exports = {
  newBlog: (req, res) => {
    const payload = req.body;

    BlogModel.createBlog(payload)
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: {
            blog: blog.toJSON(),
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
  getBlog: (req, res) => {
    const {
      blog: { blogId },
    } = req;

    BlogModel.findBlog({ id: blogId })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateBlog: (req, res) => {
    const {
      blogId: { blogId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    BlogModel.updateBlog({ id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ id: blogId });
      })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteBlog: (req, res) => {
    const {
      params: { blogId },
    } = req;

    BlogModel.deleteBlog({ id: blogId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfBlogsDeleted: numberOfEntriesDeleted
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

  getAllBlogs: (req, res) => {
    BlogModel.findAllBlogs(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllBlogsByUser: (req, res) => {
    BlogModel.findAllBlogsByUser(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteBlogsByUser: (req, res) => {
    BlogModel.deleteBlogsByUser(req.query)
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfBlogsDeleted: numberOfEntriesDeleted
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

  updateRating: (req, res) => {
    const {
      blogId: { blogId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Rating.",
        },
      });
    }

    BlogModel.updateRatingById({ id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ id: blogId });
      })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateComments: (req, res) => {
    const {
      blogId: { blogId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Comments.",
        },
      });
    }

    BlogModel.updateCommentsById({ id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ id: blogId });
      })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateTags: (req, res) => {
    const {
      blogId: { blogId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Tags.",
        },
      });
    }

    BlogModel.updateTagsById({ id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ id: blogId });
      })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateUpvotes: (req, res) => {
    const {
      blogId: { blogId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Upvotes.",
        },
      });
    }

    BlogModel.updateUpvotesById({ id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ id: blogId });
      })
      .then((blog) => {
        return res.status(200).json({
          status: true,
          data: blog.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
};
