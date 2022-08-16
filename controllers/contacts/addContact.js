const Joi = require("joi");
const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const newContact = await contactsOperations.addContact(req.body);
  res.status(201).json(newContact);
};

module.exports = addContact;
