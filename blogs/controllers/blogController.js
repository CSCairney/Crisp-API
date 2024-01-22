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

    BlogModel.findBlog({ blog_id: blogId })
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
    const blogId = req.params.blogId;
    const { title, content, user_id, rating, tags, comments } = req.body;
  
    try {
      const existingBlog = BlogModel.findBlog({ blog_id: blogId });
  
      if (!existingBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Construct the query for update
      const query = { blog_id: blogId };
      
      // Construct the updated values
      const updatedValues = {
        title: title || existingBlog.title, // Use existing title if not provided in the request
        content: content || existingBlog.content, // Use existing content if not provided in the request
        user_id: user_id || existingBlog.user_id, // Use existing user_id if not provided in the request
        rating: rating || existingBlog.rating, // Use existing rating if not provided in the request
        tags: tags || existingBlog.tags, // Use existing tags if not provided in the request
        comments: comments || existingBlog.comments, // Use existing comments if not provided in the request
      };
  
      // Update the blog
      const result = BlogModel.updateBlog({blog_id: blogId}, updatedValues);
  
      if (result[0] === 1) {
        return res.status(200).json({ message: 'Blog updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update blog' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteBlog: (req, res) => {
    const {
      params: { blogId },
    } = req;

    BlogModel.deleteBlog({ blog_id: blogId })
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

    BlogModel.updateRatingById({ blog_id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ blog_id: blogId });
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

    BlogModel.updateCommentsById({ blog_id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ blog_id: blogId });
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

    BlogModel.updateTagsById({ blog_id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ blog_id: blogId });
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

    BlogModel.updateUpvotesById({ blog_id: blogId }, payload)
      .then(() => {
        return BlogModel.findBlog({ blog_id: blogId });
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
