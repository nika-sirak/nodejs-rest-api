const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne(
    {
      _id: contactId,
      owner: _id,
    },
    "-createdAt -updatedAt"
  ).populate("owner", "email");

  if (!contact) {
    throw createError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getById;
