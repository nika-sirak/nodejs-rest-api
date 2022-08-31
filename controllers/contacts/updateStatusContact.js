const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updateContact) {
    throw createError(404, "Not found");
  }
  res.json(updateContact);
};

module.exports = updateStatusContact;
