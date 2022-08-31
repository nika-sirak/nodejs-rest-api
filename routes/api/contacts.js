const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validationBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
