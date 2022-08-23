const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const validationMiddleware = validation(contactSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validationMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validationMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
