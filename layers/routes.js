const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");

// Controller Imports
const LayerController = require("./controllers/layerController");

// JSON Schema Imports for payload verification
const newLayerPayload = require("./schemas/newLayerPayload.js");
const updateLayerPayload = require("./schemas/updateLayerPayload.js");

router.get("/", [isAuthenticatedMiddleware.check], LayerController.getLayer);

router.post(
  "/",
  [SchemaValidationMiddleware.verify(newLayerPayload)],
  LayerController.newLayer
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  LayerController.getAllLayers
);

router.patch(
  "/update/:layerId",
  [
    isAuthenticatedMiddleware.check,
    SchemaValidationMiddleware.verify(updateLayerPayload),
  ],
  LayerController.updateLayer
);

router.delete(
  "/:layerId",
  [isAuthenticatedMiddleware.check],
  LayerController.deleteLayer
);

module.exports = router;
