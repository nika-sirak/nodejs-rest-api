const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const updateContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  ).populate("owner", "email");

  if (!updateContact) {
    throw createError(404, "Not found");
  }
  res.json(updateContact);
};

module.exports = updateStatusContact;
