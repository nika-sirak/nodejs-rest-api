const express = require("express");
const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw createError(404, `Contact with id ${contactId} was not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
