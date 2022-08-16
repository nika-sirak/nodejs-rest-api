const Joi = require("joi");
const createError = require("http-errors");
const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    error.message = "missing fields";
    error.status = 400;
    throw error;
  }

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
