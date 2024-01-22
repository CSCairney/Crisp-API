const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const BlogController = require("./controllers/blogController");

// JSON Schema Imports for payload verification
const newBlogPayload = require("./schemas/newBlogPayload");
const newBlogCommentPayload = require("./schemas/newBlogCommentPayload");
const updateBlogContentPayload = require("./schemas/updateBlogContentPayload");
const updateBlogUpvoteCounterPayload = require("./schemas/updateBlogUpvoteCounterPayload");
const { roles } = require("../config");

router.get("/", [isAuthenticatedMiddleware.check], BlogController.getBlog);

router.post(
  "/",
  [SchemaValidationMiddleware.verify(newBlogPayload)],
  BlogController.newBlog
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  BlogController.getAllBlogs
);

router.patch(
  "/update/:blogId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.USER)
  ],
  BlogController.updateBlog
);

router.patch(
  "/update/rating/:blogId",
  [isAuthenticatedMiddleware.check],
  BlogController.updateRating
);

router.patch(
  "/update/upvote/:blogId",
  [isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateBlogUpvoteCounterPayload),
    CheckPermissionMiddleware.has(roles.USER)],
  BlogController.updateUpvotes
);

router.patch(
  "/update/comment/:blogId",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(newBlogCommentPayload),
    CheckPermissionMiddleware.has(roles.USER)
  ],
  BlogController.updateComments
);

router.delete(
  "/:blogId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN)
  ],
  BlogController.deleteBlog
);

module.exports = router;
