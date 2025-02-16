const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const {
  authenticate,
  validationBody,
  isValidId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
