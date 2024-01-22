const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const BlogController = require("./controllers/blogController");

// JSON Schema Imports for payload verification
const newBlogPayload = require("./schemas/newBlogPayload");
const updateBlogContentPayload = require("./schemas/updateBlogContentPayload");

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
    SchemaValidationMiddleware.verify(updateBlogContentPayload),
    CheckPermissionMiddleware.has(roles.ADMIN)
  ],
  BlogController.updateBlog
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
