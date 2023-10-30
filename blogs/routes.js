const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const BlogController = require("./controllers/blogController");

// JSON Schema Imports for payload verification
const newBlogPayload = require("./schemas/newBlogPayload");
const updateBlogPayload = require("./schemas/updateBlogPayload");

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
    SchemaValidationMiddleware.verify(updateBlogPayload),
  ],
  BlogController.updateBlog
);

router.delete(
  "/:blogId",
  [isAuthenticatedMiddleware.check],
  BlogController.deleteBlog
);

module.exports = router;
