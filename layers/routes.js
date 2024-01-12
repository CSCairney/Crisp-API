const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const LayerController = require("./controllers/layerController");

// JSON Schema Imports for payload verification
const newLayerPayload = require("./schemas/newLayerPayload.js");
const updateLayerPayload = require("./schemas/updateLayerPayload.js");

const { roles } = require("../config");

router.get("/:layer", [isAuthenticatedMiddleware.check], LayerController.getLayerByName);

router.post(
  "/",
  [
    SchemaValidationMiddleware.verify(newLayerPayload),
    CheckPermissionMiddleware.has(roles.ADMIN),
  ],
  LayerController.newLayer
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  LayerController.getAllLayers
);

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  LayerController.getLayerNames
);

router.patch(
  "/update/:layerId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateLayerPayload),
  ],
  LayerController.updateLayer
);

router.delete(
  "/:layerId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
  ],
  LayerController.deleteLayer
);

module.exports = router;
