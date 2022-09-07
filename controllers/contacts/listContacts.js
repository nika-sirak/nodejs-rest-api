const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit: +limit,
  }).populate("owner", "email");
  res.json(contacts);
};

module.exports = listContacts;
