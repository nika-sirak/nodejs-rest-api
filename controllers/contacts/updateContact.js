const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsOperations.updateContact(
    contactId,
    req.body
  );

  if (!updateContact) {
    throw createError(404, "Not found");
  }
  res.json(updateContact);
};

module.exports = updateContact;
