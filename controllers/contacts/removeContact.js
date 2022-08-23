const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);

  if (!result) {
    throw createError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
